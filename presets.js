const Colors = require("./colors");
const { initFeedbacks } = require("./feedbacks")

/**
 * @typedef { import("@companion-module/base").CompanionButtonPresetDefinition } CompanionButtonPresetDefinition
 */

let feedbacks = initFeedbacks();

function feedbackArray(key, override) {
    let feedback = feedbacks[key];

    if (feedback) {
        let presetFeedback = {
            feedbackId: key
        }
        if (feedback.options) {
            let options = {};
            feedback.options.forEach(opt => {
                options[opt.id] = opt.default;
            })
            presetFeedback.options = {
                ...options,
                ...override
            };
        }        console.log(presetFeedback)
        return [presetFeedback];
    }

    return [];
}

exports.getPresets = function () {
    /**
     * @type {import("@companion-module/base").CompanionPresetDefinitions}
     */
    let presets = {}

    presets["broadcast_advertise"] = ({
        type: "button",
        category: 'Toggles',
        name: 'Toggle Broadcast Advertise',
        style: {
            text: 'Broadcast\\nAdvertise',
            size: 14,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'toggle_broadcast_advertise', } ]}],
        feedbacks: feedbackArray("broadcast_advertise"),
    })
    presets["player_cams"] = ({
        type: "button",
        category: 'Toggles',
        name: 'Toggle Player Cams',
        style: {
            text: 'Toggle Cams',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'toggle_cams', } ]}],
        feedbacks: feedbackArray("broadcast_show_cams"),
    })
    presets["flip_teams"] = ({
        type: "button",
        category: 'Toggles',
        name: 'Toggle Flip Teams',
        style: {
            text: 'Flip Teams',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'toggle_flip_teams', } ]}],
        feedbacks: feedbackArray("match_flip_teams"),
    })
    presets["map_attack"] = ({
        type: "button",
        category: 'Toggles',
        name: 'Toggle Map Attack',
        style: {
            text: 'Map Attack',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'toggle_map_attack', options: { useNull: true } } ]}],
        feedbacks: feedbackArray("broadcast_map_attack"),
    })






    presets["observer_settings_syncer"] = ({
        type: "button",
        category: 'Observer Settings',
        name: 'Syncer',
        style: {
            text: 'Syncer',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'toggle_observer_setting', options: { setting: "Show syncer" } } ]}],
        feedbacks: feedbackArray("broadcast_observer_settings", { setting: "Show syncer" }),
    })

    presets["observer_setting_obs_overlay"] = ({
        type: "button",
        category: 'Observer Settings',
        name: 'Obs\\nOverlay',
        style: {
            text: 'Obs\\nOverlay',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'toggle_observer_setting', options: { setting: "Show overlay" } } ]}],
        feedbacks: feedbackArray("broadcast_observer_settings", { setting: "Show overlay" }),
    })


    presets["display_team_1"] = ({
        type: "button",
        category: 'Displays',
        name: 'Team 1',
        style: {
            text: '$(slmngg:match_team1_code)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        previewStyle: {
            text: "Team 1\nCode",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_ready", { teamSelect: "num-1" }),
        steps: []
    })
    presets["display_team_2"] = ({
        type: "button",
        category: 'Displays',
        name: 'Team 2',
        style: {
            text: '$(slmngg:match_team2_code)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        previewStyle: {
            text: "Team 2\nCode",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_ready", { teamSelect: "num-2" }),
        steps: []
    })
    presets["display_team_left"] = ({
        type: "button",
        category: 'Displays',
        name: 'Left team',
        style: {
            text: '$(slmngg:match_left_code)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        previewStyle: {
            text: "Left\nCode",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_ready", { teamSelect: "side-left" }),
        steps: []
    })
    presets["display_team_right"] = ({
        type: "button",
        category: 'Displays',
        name: 'Right team',
        style: {
            text: '$(slmngg:match_right_code)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        previewStyle: {
            text: "Right\nCode",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_ready", { teamSelect: "side-right" }),
        steps: []
    })


    presets["display_team_left_logo"] = ({
        type: "button",
        category: 'Displays',
        name: 'Left team logo',
        previewStyle: {
            text: "Left\nLogo",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_logo", { teamSelect: "side-left", "size": "full" }),
        steps: []
    })
    presets["display_team_right_logo"] = ({
        type: "button",
        category: 'Displays',
        name: 'Right team logo',
        previewStyle: {
            text: "Right\nLogo",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_logo", { teamSelect: "side-right", "size": "full" }),
        steps: []
    })
    presets["display_team_left_combo_logo"] = ({
        type: "button",
        category: 'Displays',
        name: 'Left team logo',
        style: {
            text: '$(slmngg:match_left_code)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
            alignment: "center:bottom",
            pngalignment: "center:top",
        },
        previewStyle: {
            text: "Left\nLogo & code",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_logo", { teamSelect: "side-left", "size": "medium" }),
        steps: []
    })
    presets["display_team_right_combo_logo"] = ({
        type: "button",
        category: 'Displays',
        name: 'Right team logo',
        style: {
            text: '$(slmngg:match_right_code)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
            alignment: "center:bottom",
            pngalignment: "center:top",
        },
        previewStyle: {
            text: "Right\nLogo & code",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("theme_logo", { teamSelect: "side-right", "size": "medium" }),
        steps: []
    })



    presets["display_tally"] = ({
        type: "button",
        category: 'Displays',
        name: 'Tally',
        style: {
            text: '$(slmngg:staff_observer_number)',
            size: 30,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        previewStyle: {
            text: "Obs Tally",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbackArray("observer_tally"),
        steps: []
    })






    presets["trigger_music_break"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Skip Break Music',
        style: {
            text: 'Break Music',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [{ down: [{ actionId: 'prod_trigger', options: { event: "skip_song", data: "break" } }] }],
        feedbacks: []
    })
    presets["trigger_music_desk"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Skip Desk Music',
        style: {
            text: 'Desk Music',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'prod_trigger', options: { event: "skip_song", data: "desk" } } ]}],
        feedbacks: []
    })
    presets["trigger_map_music"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Fade Map Music',
        style: {
            text: 'Map Music',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'prod_trigger', options: { event: "fade_map_music", data: "" } } ]}],
        feedbacks: []
    })
    presets["set_title"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Set Title',
        style: {
            text: 'Set\\nTitle',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'set_title' } ]}],
        feedbacks: []
    })
    presets["multi_map_win_team_1"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Map Win Team 1',
        style: {
            text: 'Map Win\\n$(slmngg:match_team1_code)',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'multi_map_win', options: { unsetMapAttack: true, teamNum: 1 } } ]}],
        feedbacks: []
    })
    presets["multi_map_win_team_2"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Map Win Team 2',
        style: {
            text: 'Map Win\\n$(slmngg:match_team2_code)',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        steps: [ { down: [ { actionId: 'multi_map_win', options: { unsetMapAttack: true, teamNum: 2 } } ]}],
        feedbacks: []
    })


    presets["desk_display_match_paused"] = ({
        type: "button",
        category: "Desk Display",
        name: "Match Paused",
        style: {
            text: "Desk\\nMatch\\nPaused",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black
        },
        steps: [
            {
                down: [
                    {
                        actionId: "desk_display_text",
                        options: {
                            "style": "Event",
                            "mainText": "Match Paused"
                        }
                    }
                ]
            },
            {
                down: [
                    {
                        actionId: "desk_display_special",
                        options: {
                            "display": "Match"
                        }
                    }
                ]
            }
        ],
        feedbacks: []
    })

    return presets;
}
