const actionsController = require("./actions");
const { initFeedbacks } = require("./feedbacks");
const { getPresets } = require("./presets");
const { updateVariableDefinitions } = require("./variables");

const { io } = require("socket.io-client");
const { InstanceBase, InstanceStatus, runEntrypoint } = require("@companion-module/base");


class MapObject {
    constructor(text, arrays = false) {
        this.arrays = arrays;
        this.data = (text || "").split("\n").map(e => {
            let [key, data] = e.split("=");
            return { key, data: arrays ? (data || "").split(",") : data };
        }).filter(e => e.key);
    }

    get(key) {
        let data = this.data.find(n => n.key === key)?.data;
        if (data === "false") return false;
        if (data === "true") return true;
        return data;
    }
}

function cleanID(id) {
    if (!id) return null;
    if (typeof id !== "string") return id.id || null; // no real id oops
    if (id.startsWith("rec") && id.length === 17) id = id.slice(3);
    return id;
}

class instance extends InstanceBase {
    constructor(internal) {
        super(internal);

        // adds actionsController.getActions() to instance.getActions()
        Object.assign(this, {
            ...actionsController
        });

        this.updateVariableDefinitions = updateVariableDefinitions;
    }

    async init(config) {
        this.slmnggCache = new Map();
        this.states = new Map();
        this.config = config;

        this.timerTick = setInterval(() => {
            const now = new Date();
            const end = this.states.get("broadcast_countdown_end");
            const endTime = end ? new Date(end) : null;
            const diff = endTime ? Math.floor(((endTime - now)) / 1000) : -1;

            // console.log(JSON.stringify({ end, endTime, diff }))
            if (end && endTime) {
                if (diff > 60 * 60) {
                    this.setState("broadcast_countdown_seconds", diff);
                    let [hours, mins, secs] = [Math.floor(diff / (60 * 60)), Math.floor(diff / 60) % 60, diff % 60].map(n => n.toString());
                    this.setState("broadcast_countdown_seconds_text", [hours, mins.padStart(2, "0")].join("h"));
                    this.setState("broadcast_countdown_active", true);
                    this.setState("broadcast_countdown_needs_clear", false);
                } else if (diff > 0) {
                    this.setState("broadcast_countdown_seconds", diff);
                    let [mins, secs] = [Math.floor(diff / 60), diff % 60].map(n => n.toString().padStart(2, "0"));
                    this.setState("broadcast_countdown_seconds_text", [mins, secs].join(":"));
                    this.setState("broadcast_countdown_active", true);
                    this.setState("broadcast_countdown_needs_clear", false);
                } else {
                    this.setState("broadcast_countdown_seconds_text", "00:00");
                    this.setState("broadcast_countdown_seconds", -1);
                    this.setState("broadcast_countdown_active", true);
                    this.setState("broadcast_countdown_needs_clear", true);
                }
            } else {
                this.setState("broadcast_countdown_seconds_text", "--:--");
                this.setState("broadcast_countdown_seconds", -1);
                this.setState("broadcast_countdown_active", false);
                this.setState("broadcast_countdown_needs_clear", false);
            }
            // console.log("tick", this.states.get("broadcast_countdown_active"), this.states.get("broadcast_countdown_seconds"), "needs clear:", this.states.get("broadcast_countdown_needs_clear"))
        }, 1000);

        this.config.dataServerHost = this.config.useLocal ? this.config.localHost : this.config.host;
        this.config.dataServerPort = this.config.useLocal ? this.config.localPort : this.config.port;
        this.config.dataServerAddress = [this.config.dataServerHost, this.config.dataServerPort].join(":");

        this.config.clientKey = this.config.clientKey?.toLowerCase();

        await this.connectDataServer();
        this.updateEverything();
    }

    setState(key, val) {
        this.states.set(key, val);
        this.setVariableValues({ [key]: val });

        /*
         * NOTE FROM SOMEONE WHO SPENT TOO LONG HERE
         * Feedbacks are ONLY updated when the state key matches the feedback key/ID
         */

        const feedbacksToCheck = Object.entries(this._feedbacks).filter(([feedbackId, feedback]) => feedback?.check?.includes(key)).map(([feedbackId, feedback]) => feedbackId);

        this.checkFeedbacks(key, ...feedbacksToCheck);
    }

    updateEverything() {

        /**
         *
         * @type {CompanionActionDefinition}
         */
        this.setActionDefinitions(this.getActions(this));

        this._feedbacks = initFeedbacks.bind(this)();
        this.setFeedbackDefinitions(this._feedbacks);

        const presets = getPresets.bind(this)();
        this.setPresetDefinitions(presets);

        this.updateVariableDefinitions();
    }

    getConfigFields() {
        return [
            {
                type: "textinput",
                id: "host",
                label: "Data Server Address",
                width: 8,
                default: "https://data.slmn.gg",
                required: true
            },
            {
                type: "number",
                id: "port",
                label: "Data Server Port",
                required: true,
                min: 1,
                max: 65535,
                width: 4,
                default: 443,
                regex: this.REGEX_PORT
            },
            {
                type: "textinput",
                id: "clientKey",
                label: "Your client key",
                width: 8,
                required: true
            },
            {
                type: "textinput",
                id: "token",
                label: "Token",
                width: 12,
                required: false
            },
            {
                type: "textinput",
                id: "localHost",
                label: "Local Data Server Address",
                width: 8,
                default: "http://localhost"
            },
            {
                type: "number",
                id: "localPort",
                label: "Local Data Server Port",
                min: 1,
                max: 65535,
                width: 4,
                default: 8901,
                regex: this.REGEX_PORT
            },
            {
                type: "checkbox",
                id: "useLocal",
                label: "Use local connection",
                width: 4,
                required: true
            }
        ];
    }

    async configUpdated(config) {
        this.config = config;

        this.config.dataServerHost = this.config.useLocal ? this.config.localHost : this.config.host;
        this.config.dataServerPort = this.config.useLocal ? this.config.localPort : this.config.port;
        this.config.dataServerAddress = [this.config.dataServerHost, this.config.dataServerPort].join(":");

        return this.connectDataServer();
    }

    async destroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
        if (this.timerTick) {
            clearInterval(this.timerTick);
        }
    }

    async connectDataServer() {
        let host = this.config.useLocal ? this.config.localHost : this.config.host;
        let port = this.config.useLocal ? this.config.localPort : this.config.port;

        if (!host || !port) {
            this.updateStatus(InstanceStatus.BadConfig, "No SLMN.GG connection details listed");
            return this.log("error", "No SLMN.GG connection details listed");
        }

        if (!this.config.clientKey) {
            this.updateStatus(InstanceStatus.BadConfig, "No SLMN.GG client key listed");
            return this.log("error", "No SLMN.GG client key listed");
        }

        if (this.socket) {
            await this.socket.disconnect();
        }

        this.updateStatus(InstanceStatus.Connecting, "Connecting");
        this.socket = io(`${host}:${port}`, { query: { token: this.config.token } });
        this.log("debug", `Connecting to ${host}:${port}`);

        this.socket.on("connect", () => {
            this.updateStatus(InstanceStatus.Ok);

            this.log("info", `Connected to SLMN.GG Data Server (client: ${this.config.clientKey})`);

            this.socket.emit("prod-join", this.config.clientKey);
            this.socket.emit("subscribe-multiple", [...this.slmnggCache.keys()]);
            this.getData(`client-${this.config.clientKey}`);
        });

        this.socket.on("auth_status", (status) => {
            if (status.error) {
                this.updateStatus(InstanceStatus.BadConfig, status.message);
            } else {
                console.log("user", status.user);
            }
        });

        this.socket.on("data_update", (id, data) => {
            // console.log(new Date().toISOString(), "data update", `prod-${this.config.clientKey}`, id)
            if (data?.key === this.config.clientKey && data.__tableName === "Clients") this.slmnggCache.set("client", data);
            this.slmnggCache.set(id, data);
            this.generateData();
        });

        const sceneTargetsMyRoles = (sceneName) => {
            if (!sceneName) return false;
            const roles = JSON.parse(this.states.get("client_staff_roles") || "[]");

            if (sceneName.toLowerCase().includes("replay")) {
                // this.log("debug", `Scene [${sceneName}] checking against ${roles.join("/")}`)
                return roles.some(r => r.toLowerCase().includes("replay"));
            }
            if (sceneName.toLowerCase().includes("stat")) {
                // this.log("debug", `Scene [${sceneName}] checking against ${roles.join("/")}`)
                return roles.some(r => r.toLowerCase().includes("stat"));
            }
            if (["OBSDIR", "Director", "Clean feed"].some(str => sceneName.includes(str.toLowerCase()))) {
                // this.log("debug", `Scene [${sceneName}] checking against ${roles.join("/")}`)
                return roles.some(r => r.toLowerCase().includes("stat"));
            }
            const observerNumber = (this.states.get("staff_observer_number"))?.toString();
            if (observerNumber && ["Obs", "Game"].some(str => sceneName.toLowerCase().includes(str.toLowerCase())) && observerNumber !== "") {
                // this.log("debug", `Scene [${sceneName}] checking against ${roles.join("/")}`)
                return sceneName.includes(observerNumber);
            }
        };

        this.socket.onAny((event, data) => {
            console.log("Socket", event, data);
        });

        this.socket.on("prod_preview_program_change", (data) => {
            // TODO: this needs to update with the new obs director stuff
            console.log("prod_preview", data);
            const { broadcastKey, previewScene, programScene } = data;

            this.setState("producer_program_scene", programScene);
            this.setState("producer_preview_scene", previewScene);

            if (sceneTargetsMyRoles(programScene)) {
                this.setState("observer_tally", "program");
            } else if (sceneTargetsMyRoles(previewScene)) {
                this.setState("observer_tally", "preview");
            } else {
                this.setState("observer_tally", "inactive");
            }
        });

        this.socket.on("action_error", ({ action, error, errorCode, errorMessage }) => {
            this.log("error", `Action error on [${action}]: ${errorCode} - ${JSON.stringify(errorMessage)}`);
        });

        this.socket.on("error", (error) => this.log("error", `Socket error: ${error.message}`));
        this.socket.on("connect_error", (error) => this.log("error", `Socket connection error: ${error.message} ${JSON.stringify(error)}`));
        this.socket.on("disconnect", (reason) => this.log("error", `Socket disconnected: ${reason}`));

        this.socket.io.on("error", (error) => this.log("error", `Socket error: ${error.message} ${JSON.stringify(error)}`));
        this.socket.io.on("reconnect", (attempt) => this.log("info", `Socket reconnected after ${attempt} attempt(s)`));
        this.socket.io.on("reconnect_error", (error) => this.log("info", `Socket reconnection error ${error.message}`));
        this.socket.io.on("reconnect_failed", () => this.log("info", `Socket reconnection failed`));
        this.socket.io.on("reconnect_attempt", (attempt) => this.log("debug", `Socket reconnecting: attempt ${attempt}`));
    }

    async getData(id) {
        if (id?.id) id = id.id;
        if (!id) return null;
        // console.log(`[get]`, id);
        if (id.startsWith("rec")) id = id.slice(3);
        if (this.slmnggCache.has(id)) return this.slmnggCache.get(id);
        // console.log(new Date().toISOString(), "Get and subscribe:", id);
        this.socket.emit("get_and_subscribe", id);
        this.slmnggCache.set(id, null);
        return null;
    }

    async generateData() {
        // console.log(new Date().toISOString(), "gen:all")
        // console.log(new Date().toISOString(), "subscriptions", [...this.slmnggCache.keys()])
        // generate any data we could want here

        const streams = (await this.getData(`special:streams`))?.streams;

        if (await this.getData(`client-${this.config.clientKey}`)) {
            let client = this.slmnggCache.get(`client-${this.config.clientKey}`);
            this.generateClient(client);
            // console.log(new Date().toISOString(), "gen:client-broadcasts", client.broadcast)

            this.setState(`client_stream_delay`, 0);
            this.setState(`client_stream_delay`, 0);
            if (client?.key && streams?.length) {
                // find our stream from transmitters
                const myStreams = streams.filter(s => s.clientName === client?.key);
                // client_stream_delay
                const delay = myStreams.find(s => s?.settings?.stream_delay_enabled && s?.settings?.stream_delay_seconds)?.settings?.stream_delay_seconds;
                console.log("streams", myStreams.find(s => s?.settings?.stream_delay_enabled && s?.settings?.stream_delay_seconds));
                console.log(delay);
                if (delay !== undefined) {
                    this.setState(`client_stream_delay`, parseInt(delay));
                    this.setState(`client_stream_delay_ms`, parseInt(delay) * 1000);
                }
            }

            if (client.broadcast?.length) { // client.broadcast = object[]
                let broadcastID = client.broadcast[0];
                let broadcast = await this.getData(broadcastID);
                await this.generateBroadcast(broadcast);

                if (broadcast?.live_match?.length) {
                    let matchID = broadcast.live_match[0];
                    let match = await this.getData(matchID);
                    this.generateMatch(match);
                } else {
                    this.generateMatch();
                }

                if (broadcast?.gfx?.length) {
                    let gfx = await Promise.all((broadcast.gfx.map(id => this.getData(id))));
                    gfx.forEach((g, i) => {
                        if (!g?.short) return;
                        this.setState(`gfx_${i + 1}_short`, g.short);
                        this.setState(`gfx_${i + 1}_id`, g.id);
                        this.setState(`gfx_${i + 1}_type`, g.type);
                    });

                    if (gfx.length < 24) {
                        for (let i = gfx.length; i < 24; i++) {
                            this.setState(`gfx_${i + 1}_short`, "");
                            this.setState(`gfx_${i + 1}_id`, "");
                            this.setState(`gfx_${i + 1}_type`, "");
                        }
                    }
                }

            } else {
                this.generateBroadcast();
                this.generateMatch();
            }
        } else {
            this.generateClient();
            this.generateBroadcast();
            this.generateMatch();
        }
    }

    generateClient(client) {
        // console.log(new Date().toISOString(), "gen:client", client?.id);
        if (!client) {
            return [
                "client_key",
                "client_name",
                "client_id",
                "client_staff"
            ].forEach(key => {
                this.setState(key, undefined);
            });
        }
        this.setState("client_key", client.key);
        this.setState("client_name", client.name);
        this.setState("client_id", client.id);
        this.setState("client_staff", client.staff?.[0]);
    }


    async generateBroadcast(broadcast) {
        // console.log(new Date().toISOString(), "gen:broadcast", broadcast?.id);
        if (!broadcast) {
            return [
                "broadcast_key",
                "broadcast_name",
                "broadcast_title",
                "broadcast_relative_name",
                "broadcast_countdown_end",
                "broadcast_map_attack",
                "broadcast_show_live_match",
                "broadcast_advertise",
                "broadcast_show_cams",
                "broadcast_observer_settings",
                "broadcast_desk_display",
                "broadcast_event_name",
                "broadcast_event_id",
                "broadcast_event_theme_id",
                "broadcast_live_text_channel_id"
            ].forEach(key => {
                this.setState(key, undefined);
            });
        }
        this.setState("broadcast_key", broadcast.key);
        this.socket.emit("prod-broadcast-join", broadcast.key);

        this.setState("broadcast_name", broadcast.name);
        this.setState("broadcast_relative_name", broadcast.relative_name);
        this.setState("broadcast_title", broadcast.title);

        this.setState("broadcast_countdown_end", broadcast.countdown_end);
        this.setState("broadcast_map_attack", broadcast.map_attack);

        this.setState("broadcast_show_live_match", broadcast.show_live_match);
        this.setState("broadcast_advertise", broadcast.advertise);
        this.setState("broadcast_show_cams", broadcast.show_cams);
        this.setState("broadcast_desk_display", broadcast.desk_display);
        this.setState("broadcast_observer_settings", (broadcast.observer_settings || []).join(", "));

        if (broadcast.discord_control) {
            let discord = new MapObject(broadcast.discord_control);
            this.setState("broadcast_live_text_channel_id", discord.get("live_text_channel"));
        } else {
            this.setState("broadcast_live_text_channel_id", undefined);
        }


        if (broadcast.event?.length) {
            let eventID = broadcast.event[0];
            let event = await this.getData(eventID);
            if (!event) {
                return [
                    "broadcast_event_name",
                    "broadcast_event_short",
                    "broadcast_event_id",
                    "broadcast_event_theme_id"
                ].forEach(key => {
                    this.setState(key, undefined);
                });
            }

            this.setState("broadcast_event_short", event.short);
            this.setState("broadcast_event_name", event.name);
            this.setState("broadcast_event_id", event.id);
            this.setState("broadcast_event_theme_id", event.theme?.[0]);

            if (event.theme?.[0]) {
                let theme = await this.getData(event.theme?.[0]);
                if (theme) {
                    this.setState("broadcast_event_theme_id", theme.id);
                    this.setState("broadcast_event_theme_logo_background", theme.color_logo_background);
                    this.setState("broadcast_event_theme_text_on_logo_background", theme.color_text_on_logo_background);
                    this.setState("broadcast_event_theme_color", theme.color_theme);
                    this.setState("broadcast_event_theme_text_on_theme", theme.color_text_on_theme);
                }
            } else {
                // unset theme

                this.setState("broadcast_event_theme_logo_background", "");
                this.setState("broadcast_event_theme_text_on_logo_background", "");
                this.setState("broadcast_event_theme_color", "");
                this.setState("broadcast_event_theme_text_on_theme", "");
                this.setState("broadcast_event_theme_ready", false);
            }

        } else {
            return [
                "broadcast_event_name",
                "broadcast_event_id",
                "broadcast_event_theme_id"
            ].forEach(key => {
                this.setState(key, undefined);
            });
        }


        [broadcast.team_1_cams || [], broadcast.team_2_cams || []].forEach((cams, i) => {
            const num = i + 1;
            const teamSide = this.states.get("match_flip_teams") ? ["right", "left"][i] : ["left", "right"][i]
            cams.forEach(async (camID, ci) => {
                const guest = await this.getData(camID);
                const player = await this.getData(guest?.player?.[0]);

                const setCamState = (key, val) => {
                    this.setState(`player_cam_team_${num}_player_${ci+1}_${key}`, val)
                    this.setState(`player_cam_team_${teamSide}_player_${ci+1}_${key}`, val)
                };

                if (player) {
                    setCamState("id", player.id)
                    setCamState("name", player.name)
                    setCamState("battletag_full", player.battletag)
                    setCamState("battletag", (player.battletag || "").split("#")?.[0])
                } else {
                    setCamState("id", "")
                    setCamState("name", "")
                    setCamState("battletag_full", "")
                    setCamState("battletag", "")
                }
            })
        });


        // console.log("broadcast.observer_settings", this.states.get("broadcast_observer_settings"))
        // console.log("Show syncer", this.states.get("broadcast_observer_settings").includes("Show syncer"))
    }

    generateMatch(match) {
        if (!match) {

            [
                "match_id",
                "match_name",
                "match_codes",
                "match_codes",
                "match_team1_code",
                "match_team2_code",
                "match_score_1",
                "match_score_2",
                "match_scores",
                "match_first_to",
                "match_is_complete",
                "match_flip_teams"
            ].forEach(key => {
                this.setState(key, undefined);
            });
            this.generateTeams();
            this.generateRelationships();
            return;
        }
        this.setState("match_id", match.id);
        this.setState("match_name", match.name);

        let scores = [match.score_1 || 0, match.score_2 || 0];
        let codes = (match._codes || "").split(",");
        if (!codes?.[0]) codes.push("--");
        if (!codes?.[1]) codes.push("--");

        this.setState("match_codes", codes.join(" vs "));
        this.setState("match_team1_code", codes[0]);
        this.setState("match_team2_code", codes[1]);
        this.setState("match_score_1", match.score_1);
        this.setState("match_score_2", match.score_2);
        this.setState("match_scores", scores.join(" - "));
        this.setState("match_first_to", match.first_to);
        this.setState("match_is_complete", match.score_1 === match.first_to || match.score_2 === match.first_to);
        this.setState("match_flip_teams", match.flip_teams);

        if (match.flip_teams) {
            scores = scores.reverse();
            codes = codes.reverse();
        }
        this.setState("match_left_code", codes[0]);
        this.setState("match_left_score", scores[0]);
        this.setState("match_right_code", codes[1]);
        this.setState("match_right_score", scores[1]);

        this.setState("match_codes_flippable", codes.join(" vs "));
        this.setState("match_scores_flippable", scores.join(" - "));

        this.generateTeams(match);
        this.generateRelationships(match);
        this.generateMaps(match);
    }


    async generateTeams(match) {
        if (!match?.teams) {
            // unset team, theme

            ["name", "code", "theme_logo_background", "theme_text_on_logo_background", "theme_color", "theme_text_on_theme", "theme_ready"].forEach(key => {
                [1, 2].forEach(teamNum => {
                    this.setState(`team_${teamNum}_${key}`, key === "theme_ready" ? false : "");
                });
                ["left", "right"].forEach(teamSide => {
                    this.setState(`team_${teamSide}_${key}`, key === "theme_ready" ? false : "");
                });
            });
        }

        if (!match?.teams?.length) return;
        for (let i = 0; i < match.teams.length; i++) {
            const id = match.teams[i];
            let team = await this.getData(id);
            let teamNum = i + 1;
            let teamSide = this.states.get("match_flip_teams") ? ["right", "left"][i] : ["left", "right"][i];
            const setTeamState = (key, val) => {
                this.setState(`team_${teamNum}_${key}`, val);
                this.setState(`team_${teamSide}_${key}`, val);
            };

            if (team) {
                setTeamState("name", team.name);
                setTeamState("code", team.code);

                if (team.theme?.[0]) {
                    let theme = await this.getData(team.theme?.[0]);
                    if (theme) {

                        setTeamState("theme_id", theme.id);
                        setTeamState("theme_logo_background", theme.color_logo_background);
                        setTeamState("theme_text_on_logo_background", theme.color_text_on_logo_background);
                        setTeamState("theme_color", theme.color_theme);
                        setTeamState("theme_text_on_theme", theme.color_text_on_theme);

                        setTeamState("theme_ready", true);
                        this.setState("theme_ready", true);
                    }
                } else {
                    // unset theme

                    setTeamState("theme_logo_background", "");
                    setTeamState("theme_text_on_logo_background", "");
                    setTeamState("theme_color", "");
                    setTeamState("theme_text_on_theme", "");
                    setTeamState("theme_ready", false);
                    this.setState("theme_ready", false);
                }

                if (team.players?.length) {
                    (team.players || []).forEach(async (playerID, pi) => {
                        const num = i + 1;
                        const teamSide = this.states.get("match_flip_teams") ? ["right", "left"][i] : ["left", "right"][i]

                        const setPlayerState = (key, val) => {
                            this.setState(`player_team_${num}_player_${pi+1}_${key}`, val)
                            this.setState(`player_team_${teamSide}_player_${pi+1}_${key}`, val)
                        };

                        const player = await this.getData(playerID);

                        if (player) {
                            // console.log(player);
                            setPlayerState("id", player.id)
                            setPlayerState("name", player.name)
                            setPlayerState("role", player.role)
                            setPlayerState("battletag_full", player.battletag)
                            setPlayerState("battletag", (player.battletag || "").split("#")?.[0])
                        } else {
                            setPlayerState("id", "")
                            setPlayerState("name", "")
                            setPlayerState("role", "")
                            setPlayerState("battletag_full", "")
                            setPlayerState("battletag", "")
                        }
                    })
                } else {
                    [1,2,3,4,5,6,7,8,9].forEach(playerNum => {
                        const num = i + 1;
                        const teamSide = this.states.get("match_flip_teams") ? ["right", "left"][i] : ["left", "right"][i]

                        const setPlayerState = (key, val) => {
                            this.setState(`player_team_${num}_player_${playerNum}_${key}`, val)
                            this.setState(`player_team_${teamSide}_player_${playerNum}_${key}`, val)
                        };
                        setPlayerState("id", "")
                        setPlayerState("name", "")
                        setPlayerState("role", "")
                        setPlayerState("battletag_full", "")
                        setPlayerState("battletag", "")

                    })
                }
            }
        }

    }

    async generateMaps(match) {
        const mapNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        let current = null;
        console.log("emptying current");

        if (!match?.maps) {
            // unset team, theme

            ["name"].forEach(key => {
                mapNums.forEach(mapNum => {
                    this.setState(`map_${mapNum}_${key}`, "");
                });
            });
        }

        if (!match?.maps?.length) return;
        for (let i = 0; i < match.maps.length; i++) {
            const id = match.maps[i];
            let map = await this.getData(id);

            let mapNum = i + 1;
            if (map && map.map?.[0]) {
                this.setState(`map_${mapNum}_name`, "");
                let gameMap = await this.getData(map.map?.[0]);


                if (!map.winner && !map.draw && !current) {
                    current = map;
                    if (current?.name?.[0]) {
                        this.setState(`current_map_name`, current?.name?.[0]);
                    }
                }

                if (gameMap) {
                    if (gameMap.name) {
                        this.setState(`map_${mapNum}_name`, gameMap.name);
                        if (cleanID(current?.id) === cleanID(map.id)) {
                            this.setState(`current_map_name`, gameMap.name);
                        }
                    }
                }
            }
        }

    }

    async generateRelationships(match) {
        // need to get match.player_relationships and rel.staff
        if (!match?.player_relationships) {
            ["producer", "observer", "lobby_admin", "observer_director", "replay_producer", "stats_producer"].forEach(role => {
                [0, 1, 2, 3, 4, 5].forEach((i) => {
                    let stateKey = `staff_${role}`;
                    this.setState(stateKey + "_" + (i + 1), ""); // name
                    this.setState(stateKey + "_" + (i + 1) + "_code", ""); // code
                    this.setState(stateKey + "_" + (i + 1) + "_id", ""); // id
                    if (i === 0) {
                        this.setState(stateKey, "");
                        this.setState(stateKey + "_code", "");
                        this.setState(stateKey + "_id", "");
                    }
                });
            });
            return;
        }
        let rels = {};

        let obsCount = 0;
        let clientStaffRoles = [];

        this.setState("staff_observer_number", "");

        for (const relID of match.player_relationships) {
            let relationship = await this.getData(relID);
            if (relationship) {
                const thisPlayer = relationship.player?.[0] === this.states.get("client_staff");
                if (thisPlayer) {
                    clientStaffRoles.push(relationship.singular_name);
                }

                let staff = await this.getData(relationship.player?.[0]);
                if (relationship.singular_name === "Observer") obsCount++;

                if (staff) {

                    // console.log("Player relationships set", relationship, staff);

                    if (staff.id === this.states.get("client_staff") && relationship.singular_name === "Observer") {
                        // this staff = correct client?
                        this.setState("staff_observer_number", obsCount);
                    }

                    if (!rels[relationship.singular_name]) {
                        rels[relationship.singular_name] = [];
                    }
                    rels[relationship.singular_name].push({
                        ...relationship,
                        player: staff
                    });
                }

            }
        }

        this.setState("client_staff_roles", JSON.stringify(clientStaffRoles));

        Object.entries(rels).forEach(([singularName, relationships]) => {
            [0, 1, 2, 3, 4, 5].forEach((i) => {
                let rel = relationships[i];
                let stateKey = `staff_${singularName.toLowerCase().replace(/ /g, "_")}`;

                if (rel?.player?.name) {
                    const name = rel.player.short ? rel.player.short?.[0] : rel.player.name;
                    const code = rel.player?.client_key || rel.player.name.toLowerCase();
                    const playerID = rel.player?.id || "";
                    const remoteFeed = rel.player?.remote_feed;

                    this.setState(stateKey + "_" + (i + 1), name);
                    this.setState(stateKey + "_" + (i + 1) + "_code", code);
                    this.setState(stateKey + "_" + (i + 1) + "_id", playerID);
                    this.setState(stateKey + "_" + (i + 1) + "_remote_feed", remoteFeed);
                    if (i === 0) {
                        this.setState(stateKey, name);
                        this.setState(stateKey + "_code", code);
                        this.setState(stateKey + "_id", playerID);
                        this.setState(stateKey + "_remote_feed", remoteFeed);
                    }
                } else {
                    this.setState(stateKey + "_" + (i + 1), "");
                    this.setState(stateKey + "_" + (i + 1) + "_code", "");
                    this.setState(stateKey + "_" + (i + 1) + "_id", "");
                    this.setState(stateKey + "_" + (i + 1) + "_remote_feed", "");
                    if (i === 0) {
                        this.setState(stateKey, "");
                        this.setState(stateKey + "_code", "");
                        this.setState(stateKey + "_id", "");
                        this.setState(stateKey + "_remote_feed", "");
                    }
                }
            });
        });
    }


    // async action(event, info) {
    //     let action = this.getActions()[event.action]
    //     // console.log({event, info, action});
    //     if (action?.handler) {
    //         return action.handler(this, { options: event.options });
    //     }
    // }
    // async feedback(event) {
    //     console.log("feedback event", event);
    // }

    async sendAction(event, data) {
        this.log("debug", `Sending action [${event}]`);
        this.socket.emit(event, data);
    }
}

runEntrypoint(instance, []);
