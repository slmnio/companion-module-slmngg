/**
 * @typedef { import("@companion-module/base").CompanionActionDefinition } CompanionActionDefinition
 */

module.exports = {
    getActions(instance) {
        const actions = {};

        /**
         *
         * @param {string} key
         * @param {CompanionActionDefinition} action
         */
        function addAction(key, action) {
            actions[key] = {
                ...action,
                key
            }
        }

        addAction("toggle_cams", {
            name: "Toggle Player Cams",
            options: [],
            description: "Toggle the in-game player cams (bottom of the screen)",
            async callback() {
                return instance.sendAction("update-broadcast", { playerCams: !instance.states.get("broadcast_show_cams") });
            }
        })
        addAction("toggle_flip_teams", {
            name: "Flip Teams",
            options: [],
            async callback() {
                return instance.sendAction("toggle-flip-teams");
            }
        })
        addAction("prediction_create", {
            name: "Create Prediction",
            options: [],
            async callback() {
                instance.setState("prediction_last", "create")
                return instance.sendAction("manage-prediction", { predictionAction: "create" });
            }
        })
        addAction("prediction_lock", {
            name: "Lock Prediction",
            options: [],
            async callback() {
                instance.setState("prediction_last", "lock")
                return instance.sendAction("manage-prediction", { predictionAction: "lock" });
            }
        })
        addAction("prediction_resolve", {
            name: "Resolve Prediction",
            options: [],
            async callback() {
                instance.setState("prediction_last", "resolve")
                return instance.sendAction("manage-prediction", { predictionAction: "resolve" });
            }
        })
        addAction("prediction_cancel", {
            name: "Cancel Prediction",
            options: [],
            async callback() {
                instance.setState("prediction_last", "cancel")
                return instance.sendAction("manage-prediction", { predictionAction: "cancel" });
            }
        })
        addAction("prediction_manage", {
            name: "Manage Prediction",
            options: [
                {
                    type: 'textinput', useVariables: true,
                    label: 'Action',
                    id: 'action',
                    default: 'create',
                },
            ],
            async callback({ options }, { parseVariablesInString }) {
                const action = await parseVariablesInString(options.action);
                if (!["create", "lock", "resolve", "cancel"].includes(action)) return instance.log("error", `Option ${action} is unknown`)
                instance.setState("prediction_last", action)
                return instance.sendAction("manage-prediction", { predictionAction: action });
            }
        })
        addAction("prod_trigger", {
            name: "Prod Trigger",
            options: [
                {
                    type: 'textinput', useVariables: true,
                    label: 'Event',
                    id: 'event',
                    default: 'create',
                },
                {
                    type: 'textinput', useVariables: true,
                    label: 'Data',
                    id: 'data',
                    default: 'create',
                },
            ],
            async callback({ options }, { parseVariablesInString }) {
                const [event, data] = await Promise.all([options.event, options.data].map(t => parseVariablesInString(t)))
                return instance.socket.emit("prod_trigger", event, data);
            }
        })
        addAction("set_title", {
            name: "Set Automatic Twitch Title",
            options: [],
            description: "Sets the associated Twitch channel's title using the broadcast's title format and match data",
            async callback() {
                return instance.sendAction("set-title");
            }
        })

        addAction("set_map_attack", {
            name: "Set Map Attack",
            options: [
                {
                    type: 'textinput', useVariables: true,
                    label: 'Side',
                    id: 'side',
                    default: 'Left',
                },
            ],
            async callback({ options }, { parseVariablesInString }) {
                let side = await parseVariablesInString(options.side);
                if (side === "") side = null;
                return instance.sendAction("update-broadcast", { mapAttack: side })
            }
        })
        addAction("toggle_map_attack", {
            name: "Toggle Map Attack",
            options: [
                {
                    type: 'checkbox',
                    label: 'Toggle Through Empty?',
                    id: 'useNull',
                    default: false,
                },
            ],
            async callback({ options }) {
                let side = "Right";
                if (instance.states.get("broadcast_map_attack") === "Right") side = "Left";
                if (options.useNull && instance.states.get("broadcast_map_attack") === "Left") side = null;
                return instance.sendAction("update-broadcast", { mapAttack: side });
            }
        })

        addAction("toggle_broadcast_advertise", {
            name: "Toggle Broadcast Advertise",
            options: [],
            description: "Toggles the match being advertised on SLMN.GG",
            async callback() {
                return instance.sendAction("update-broadcast", { advertise: !instance.states.get("broadcast_advertise") });
            }
        })

        addAction("multi_map_win", {
            name: "Multi Map Win",
            description: "Set map win, match point +1 and optionally unset map attack in one press",
            options: [
                {
                    type: 'checkbox',
                    label: 'Unset Map Attack?',
                    id: 'unsetMapAttack',
                    default: false,
                },
                {
                    type: 'textinput', useVariables: true,
                    label: 'Team Number',
                    id: 'teamNum',
                    default: '1',
                },
            ],
            async callback({ options }, { parseVariablesInString }) {
                const teamNum = await parseVariablesInString(teamNum);
                return instance.sendAction("multi-map-win", { teamNum, unsetMapAttack: options.unsetMapAttack })
            }
        })

        addAction("toggle_observer_setting", {
            name: "Toggle Observer Setting",
            description: "Toggles an observer setting (syncer or overlay)",
            options: [
                {
                    type: "dropdown",
                    choices: [
                        { id: "Show syncer", label: "Syncer" },
                        { id: "Show overlay", label: "Overlay" },
                        { id: "Use basic overlay", label: "Basic overlay" },
                    ],
                    default: "Show syncer",
                    id: "setting"
                }
            ],
            async callback({ options }) {
                return instance.sendAction("set-observer-setting", { setting: options.setting, value: "toggle" })
            }
        })

        addAction("desk_display_special", {
            name: "Set Special Desk Display",
            description: "",
            options: [
                {
                    type: "dropdown",
                    id: "display",
                    default: "Match",
                    label: "Display mode",
                    choices: [
                        { id: "Match", label: "Match (default)" },
                        { id: "Predictions", label: "Predictions" },
                        { id: "Maps", label: "Maps" },
                    ]
                }
            ],
            async callback({ options }) {
                return instance.sendAction("update-broadcast", {
                    deskDisplayMode: options.display
                })
            }
        })
        addAction("desk_display_text", {
            name: "Set Desk Display with Text",
            description: "",
            options: [
                {
                    type: "dropdown",
                    id: "style",
                    default: "Event",
                    label: "Style",
                    choices: [
                        { id: "Event", label: "Event" },
                        { id: "Team 1", label: "Team 1" },
                        { id: "Team 2", label: "Team 2" },
                    ]
                },
                {
                    type: "textinput",
                    useVariables: true,
                    id: "mainText",
                    label: "Main text",
                },
                {
                    type: "textinput",
                    useVariables: true,
                    id: "smallText",
                    label: "Small text",
                }
            ],
            async callback({ options }, { parseVariablesInString }) {
                const [mainText, smallText] = await Promise.all([options.mainText, options.smallText].map(t => parseVariablesInString(t)))

                let text = mainText;
                if (smallText && smallText !== "") {
                    text = smallText + "|" + mainText;
                }
                return instance.sendAction("update-broadcast", {
                    deskDisplayMode: `Notice (${options.style})`,
                    deskDisplayText: text
                })
            }
        })

        return actions;
    }
}
