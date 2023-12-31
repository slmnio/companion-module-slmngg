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
        }
        // console.log(presetFeedback)
        return [presetFeedback];
    }

    return [];
}

function feedbacksArray(keys, override) {
    const _f = [];

    for (let key of keys) {
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
            }
            // console.log(presetFeedback)
            _f.push(presetFeedback)
        }

    }
    return _f;
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


    presets["break_countdown"] = ({
        type: "button",
        category: 'Displays',
        name: 'Break Countdown',
        style: {
            text: '$(slmngg:broadcast_countdown_seconds_text)',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        previewStyle: {
            text: "00:00\\nBreak\\nCount",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        feedbacks: feedbacksArray(["broadcast_countdown_active", "broadcast_countdown_needs_clear"]),
        steps: [ { down: [ { actionId: 'set_or_clear_countdown', options: { seconds: 300 } } ]}],
    })






    presets["trigger_prediction_create"] = ({
        type: "button",
        category: 'Predictions',
        name: 'Create Match Pred',
        style: {
            text: 'Create Match Pred',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Lime,
        },
        steps: [{ down: [{ actionId: 'prediction_create' }] }],
        feedbacks: []
    })
    presets["trigger_prediction_create_map"] = ({
        type: "button",
        category: 'Predictions',
        name: 'Create Map Pred',
        style: {
            text: 'Create Map Pred',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Lime,
        },
        steps: [{ down: [{ actionId: 'prediction_create_map' }] }],
        feedbacks: []
    })
    presets["trigger_prediction_lock"] = ({
        type: "button",
        category: 'Predictions',
        name: 'Lock Pred',
        style: {
            text: 'Lock Pred',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.DarkBlue,
        },
        steps: [{ down: [{ actionId: 'prediction_lock' }] }],
        feedbacks: []
    })
    presets["trigger_prediction_resolve"] = ({
        type: "button",
        category: 'Predictions',
        name: 'Resolve Pred',
        style: {
            text: 'Resolve Pred',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Purple,
        },
        steps: [{ down: [{ actionId: 'prediction_resolve' }] }],
        feedbacks: []
    })
    presets["trigger_prediction_cancel"] = ({
        type: "button",
        category: 'Predictions',
        name: 'Cancel Pred',
        style: {
            text: 'Cancel Pred',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Red,
        },
        steps: [{ down: [{ actionId: 'prediction_cancel' }] }],
        feedbacks: []
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
        previewStyle: {
            text: 'Map Win\\nTeam 1',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        style: {
            text: 'Map Win\\n$(slmngg:match_team1_code)',
            size: 14,
            color: Colors.White,
            bgcolor: Colors.Black,
            alignment: "center:bottom",
            pngalignment: "center:top"
        },
        steps: [ { down: [ { actionId: 'multi_map_win', options: { unsetMapAttack: true, teamNum: 1 } } ]}],
        feedbacks: feedbackArray("theme_logo", { teamSelect: "num-1", size: "medium" })
    })

    presets["multi_map_win_team_2"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Map Win Team 2',
        previewStyle: {
            text: 'Map Win\\nTeam 2',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        style: {
            text: 'Map Win\\n$(slmngg:match_team2_code)',
            size: 14,
            color: Colors.White,
            bgcolor: Colors.Black,
            alignment: "center:bottom",
            pngalignment: "center:top"
        },
        steps: [ { down: [ { actionId: 'multi_map_win', options: { unsetMapAttack: true, teamNum: 2 } } ]}],
        feedbacks: feedbackArray("theme_logo", { teamSelect: "num-2", size: "medium" })
    })
    presets["multi_map_win_left_team"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Map Win Left Team',
        previewStyle: {
            text: 'Map Win\\nLeft',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        style: {
            text: 'Map Win\\n$(slmngg:match_left_code)',
            size: 14,
            color: Colors.White,
            bgcolor: Colors.Black,
            alignment: "center:bottom",
            pngalignment: "center:top"
        },
        steps: [ { down: [ { actionId: 'multi_map_win', options: { unsetMapAttack: true, teamNum: "left" } } ]}],
        feedbacks: feedbackArray("theme_logo", { teamSelect: "side-left", size: "medium" })
    })
    presets["multi_map_win_right_team"] = ({
        type: "button",
        category: 'Triggers',
        name: 'Map Win Right Team',
        previewStyle: {
            text: 'Map Win\\nRight',
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        style: {
            text: 'Map Win\\n$(slmngg:match_right_code)',
            size: 14,
            color: Colors.White,
            bgcolor: Colors.Black,
            alignment: "center:bottom",
            pngalignment: "center:top"
        },
        steps: [ { down: [ { actionId: 'multi_map_win', options: { unsetMapAttack: true, teamNum: "right" } } ]}],
        feedbacks: feedbackArray("theme_logo", { teamSelect: "side-right", size: "medium" })
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
