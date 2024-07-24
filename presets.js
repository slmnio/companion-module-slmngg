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
        style: {
            alignment: "center:center",
            pngalignment: "center:center",
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
        style: {
            alignment: "center:center",
            pngalignment: "center:center",
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

    presets["display_event_logo"] = ({
        type: "button",
        category: 'Displays',
        name: 'Event logo',
        previewStyle: {
            text: "Event\nLogo",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
        },
        style: {
            alignment: "center:center",
            pngalignment: "center:center",
        },
        feedbacks: feedbackArray("event_logo", { "size": "full" }),
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
            text: '($(slmngg:broadcast_countdown_needs_clear)) =="true" ? "00:00" : (($(slmngg:broadcast_countdown_active)) =="true" ?  concat(`${$(slmngg:broadcast_countdown_seconds_text)}`, \'\') : "Brk 5m")',
            size: 24,
            color: Colors.White,
            bgcolor: Colors.Black,
            png64: "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"
        },
        previewStyle: {
            text: "Break\\n00:00",
            size: 18,
            color: Colors.White,
            bgcolor: Colors.Black,
            png64: "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"
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
