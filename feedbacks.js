/**
 * @typedef { import("@companion-module/base").CompanionFeedbackDefinition } CompanionFeedbackDefinition
 */

const Colors = require("./colors");

exports.initFeedbacks = function () {
    const feedbacks = {};

    /**
     *
     * @param key
     * @param {CompanionFeedbackDefinition} feedback
     */
    function addFeedback(key, feedback) {
        feedbacks[key] = {
            key,
            ...feedback,
            type: "advanced"
        }
    }

    addFeedback("broadcast_show_cams", {
        name: "In-game Player Cams Status",
        description: "Status of the producer's in-game player cams (team bars)",
        options: [
            {
                type: 'colorpicker',
                label: 'Foreground color (Hidden)',
                id: 'fg',
                default: Colors.White,
            },
            {
                type: 'colorpicker',
                label: 'Background color (Hidden)',
                id: 'bg',
                default: Colors.Black,
            },
            {
                type: 'colorpicker',
                label: 'Foreground color (Showing)',
                id: 'fg_showing',
                default: Colors.White,
            },
            {
                type: 'colorpicker',
                label: 'Background color (Showing)',
                id: 'bg_showing',
                default: Colors.Blue,
            },
        ],
        callback: (feedback) => {
            if (!this.states.get("broadcast_key")) return {};

            if (this.states.get("broadcast_show_cams")) {
                return { color: feedback.options.fg_showing, bgcolor: feedback.options.bg_showing}
            } else {
                return { color: feedback.options.fg, bgcolor: feedback.options.bg}
            }
        }
    })


    addFeedback("broadcast_advertise", {
        name: "Broadcast Advertised Status",
        description: "Broadcast advertised on SLMN.GG",
        options: [
            {
                type: 'colorpicker',
                label: 'Foreground color (Not advertised)',
                id: 'fg',
                default: Colors.White,
            },
            {
                type: 'colorpicker',
                label: 'Background color (Not advertised)',
                id: 'bg',
                default: Colors.Black,
            },
            {
                type: 'colorpicker',
                label: 'Foreground color (Advertised)',
                id: 'fg_showing',
                default: Colors.White,
            },
            {
                type: 'colorpicker',
                label: 'Background color (Advertised)',
                id: 'bg_showing',
                default: Colors.Blue,
            },
        ],
        callback: (feedback) => {
            if (!this.states.get("broadcast_advertise")) return {};

            if (this.states.get("broadcast_advertise")) {
                return { color: feedback.options.fg_showing, bgcolor: feedback.options.bg_showing}
            } else {
                return { color: feedback.options.fg, bgcolor: feedback.options.bg}
            }
        }
    })

    addFeedback("match_flip_teams", {
        name: "Flip Team Status",
        description: "Shows if the teams are flipped in-game from the match's data",
        options: [
            {
                type: 'colorpicker',
                label: 'Foreground color (Normal)',
                id: 'fg',
                default: Colors.White,
            },
            {
                type: 'colorpicker',
                label: 'Background color (Normal)',
                id: 'bg',
                default: Colors.Black,
            },
            {
                type: 'colorpicker',
                label: 'Foreground color (Flipped)',
                id: 'fg_flipped',
                default: Colors.White,
            },
            {
                type: 'colorpicker',
                label: 'Background color (Flipped)',
                id: 'bg_flipped',
                default: Colors.Red,
            },
        ],
        callback: (feedback) => {
            if (!this.states.get("broadcast_key") || !this.states.get("match_id")) return {};

            if (this.states.get("match_flip_teams")) {
                return { color: feedback.options.fg_flipped, bgcolor: feedback.options.bg_flipped}
            } else {
                return { color: feedback.options.fg, bgcolor: feedback.options.bg}
            }
        }
    })

    addFeedback("broadcast_map_attack", {
        name: "Map Attack",
        description: "Shows which side to show the attacker icon on",
        options: [
            { type: 'colorpicker', label: 'Text color (None)', id: 'fg', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (None)', id: 'bg', default: Colors.Black, },

            { type: 'colorpicker', label: 'Text color (Left)', id: 'fg_left', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Left)', id: 'bg_left', default: Colors.Blue, },

            { type: 'colorpicker', label: 'Text color (Right)', id: 'fg_right', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Right)', id: 'bg_right', default: Colors.Red, },

            { type: 'colorpicker', label: 'Text color (Both)', id: 'fg_both', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Both)', id: 'bg_both', default: Colors.Purple, },
        ],
        callback: (feedback) => {
            if (!this.states.get("broadcast_key") || !this.states.get("broadcast_map_attack")) return {};

            let key = this.states.get("broadcast_map_attack").toLowerCase();
            return {
                color: feedback.options[`fg${key ? "_" + key : ''}`],
                bgcolor: feedback.options[`bg${key ? "_" + key : ''}`],
            }
        }
    })


    addFeedback("broadcast_observer_settings", {
        name: "Observer Setting Enabled",
        options: [
            {
                type: "dropdown",
                choices: [
                    { id: "Show syncer", label: "Syncer" },
                    { id: "Show overlay", label: "Overlay" },
                ],
                default: "Show syncer",
                id: "setting",
                label: "Setting"
            },
            { type: 'colorpicker', label: 'Text color (Disabled)', id: 'fg', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Disabled)', id: 'bg', default: Colors.Black, },

            { type: 'colorpicker', label: 'Text color (Enabled)', id: 'fg_enabled', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Enabled)', id: 'bg_enabled', default: Colors.Blue, }
        ],
        callback: (feedback) => {
            if (!this.states.get("broadcast_key")) return {};

            if (this.states.get("broadcast_observer_settings").includes(feedback.options.setting)) {
                return { color: feedback.options.fg_enabled, bgcolor: feedback.options.bg_enabled }
            } else {
                return { color: feedback.options.fg, bgcolor: feedback.options.bg }
            }
        }
    })

    addFeedback("theme_ready", {
        name: "Team Theme",
        options: [
            {
                type: "dropdown",
                label: "Team select",
                id: "teamSelect",
                default: "side-left",
                choices: [
                    { id: "num-1", "label": "Team 1" },
                    { id: "num-2", "label": "Team 2" },
                    { id: "side-left", "label": "Left team" },
                    { id: "side-right", "label": "Right team" },
                ]
            }
        ],
        callback: (feedback) => {
            // console.log("theme_ready")
            if (!this.states.get("theme_ready")) return {};
            let teamCode = feedback.options.teamSelect.split("-").pop();
            return {
                bgcolor: Colors.getHex(this.states.get(`team_${teamCode}_theme_color`)),
                color: Colors.getHex(this.states.get(`team_${teamCode}_theme_text_on_theme`)),
            }
        }
    })

    addFeedback("theme_logo", {
        name: "Team Logo",
        key: "theme_logo",
        check: ["theme_ready"],
        options: [
            {
                type: "dropdown",
                label: "Team select",
                id: "teamSelect",
                default: "side-left",
                choices: [
                    { id: "num-1", "label": "Team 1" },
                    { id: "num-2", "label": "Team 2" },
                    { id: "side-left", "label": "Left team" },
                    { id: "side-right", "label": "Right team" },
                ]
            },
            {
                type: "dropdown",
                id: "size",
                label: "Image size",
                default: "full",
                choices: [
                    {id: "full", label: "Full"},
                    {id: "medium", label: "Medium"},
                    {id: "small", label: "Small"},
                ]
            }
        ],
        callback: async (feedback) => {
            // console.log("theme_ready")
            if (!this.states.get("theme_ready")) return {};
            let teamCode = feedback.options.teamSelect.split("-").pop();
            let themeID = this.states.get(`team_${teamCode}_theme_id`)
            if (!themeID) return {};
            console.log("theme ID", themeID, this.states.get(`team_${teamCode}_name`))

            const sizes = {
                "full": "size=70&padding=20",
                "medium": "size=48&padding=20",
                "small": "size=35&padding=20",
            }

            const image = await fetch(`${this.config.dataServerAddress}/theme.png?id=${themeID}&${sizes[feedback.options.size] || "size=70&padding=20"}`)
            const b64 = Buffer.from(await image.arrayBuffer()).toString("base64")
            const contentType = image.headers.get('content-type');
            const imageBase64 =
                `data:${contentType};base64,${b64}`;
            return {
                png64: imageBase64,
                bgcolor: Colors.getHex(this.states.get(`team_${teamCode}_theme_color`)),
                color: Colors.getHex(this.states.get(`team_${teamCode}_theme_text_on_theme`)),
            }
            /*
             * get the team's theme ID and download https://data.slmn.gg/theme.png?id={ID}&size=70&padding=20
             * get the base 64 png
             */
        }
    })


    addFeedback("observer_tally", {
        name: "Observer Tally",
        options: [
            { type: 'colorpicker', label: 'Text color (Inactive)', id: 'fg_inactive', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Inactive)', id: 'bg_inactive', default: Colors.Black, },

            { type: 'colorpicker', label: 'Text color (Preview)', id: 'fg_preview', default: Colors.Black, },
            { type: 'colorpicker', label: 'Background color (Preview)', id: 'bg_preview', default: Colors.Lime, },

            { type: 'colorpicker', label: 'Text color (Program)', id: 'fg_program', default: Colors.White, },
            { type: 'colorpicker', label: 'Background color (Program)', id: 'bg_program', default: Colors.Red, }
        ],
        callback: (feedback) => {
            if (!this.states.get("broadcast_key") || !this.states.get("observer_tally")) return {};

            let key = this.states.get("observer_tally").toLowerCase();
            return {
                color: feedback.options[`fg${key ? "_" + key : ''}`],
                bgcolor: feedback.options[`bg${key ? "_" + key : ''}`],
            }
        }
    })

    return feedbacks;
}
