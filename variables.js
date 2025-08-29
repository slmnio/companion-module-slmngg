function ucFirst(str) {
    return [str.slice(0, 1).toUpperCase(), str.slice(1)].join("")
}

exports.updateVariableDefinitions = function () {
	/**
	 *
	 * @type {[import("@companion-module/base").CompanionVariableDefinition]}
	 */
	const variables = []

	variables.push({ variableId: "client_key", name: "Production client key" })
	variables.push({ variableId: "client_name", name: "Production client name" })
	variables.push({ variableId: "client_id", name: "Production client ID" })
	variables.push({ variableId: "client_staff", name: "Production client staff record ID" })
	variables.push({ variableId: "client_staff_roles", name: "Production client staff match roles" })
	variables.push({ variableId: "client_stream_delay", name: "Stream delay reported by client's transmitter in seconds" })
	variables.push({ variableId: "client_stream_delay_ms", name: "Stream delay reported by client's transmitter in milliseconds" })

	variables.push({ variableId: "new_version_available", name: "New version available" })


	variables.push({ variableId: "broadcast_key", name: "Broadcast key" })
	variables.push({ variableId: "broadcast_name", name: "Broadcast name" })
	variables.push({ variableId: "broadcast_relative_name", name: "Broadcast relative name" })
	variables.push({ variableId: "broadcast_live_text_channel_id", name: "Broadcast live Discord text channel ID" })
	variables.push({ variableId: "broadcast_title", name: "Broadcast title (Break text)"})

	variables.push({ variableId: "broadcast_event_name", name: "Broadcast event name" })
	variables.push({ variableId: "broadcast_event_short", name: "Broadcast event short name" })
	variables.push({ variableId: "broadcast_event_id", name: "Broadcast event ID" })
	variables.push({ variableId: "broadcast_desk_display", name: "Broadcast Desk Display" })

	variables.push({ variableId: "producer_program_scene", name: "Producer Program scene name" })
	variables.push({ variableId: "producer_preview_scene", name: "Producer Preview scene name" })

	variables.push({ variableId: "broadcast_countdown_seconds", name: "Broadcast countdown timer in raw seconds" })
	variables.push({ variableId: "broadcast_countdown_seconds_text", name: "Broadcast countdown timer in formatted xx:xx" })
	variables.push({ variableId: "broadcast_countdown_active", name: "Broadcast countdown is active" })
	variables.push({ variableId: "broadcast_countdown_needs_clear", name: "Broadcast countdown needs to be cleared (sitting at 00:00)" })
	variables.push({ variableId: "broadcast_countdown_end", name: "Broadcast countdown end", description: "Time that the countdown ends" })
	variables.push({ variableId: "broadcast_map_attack", name: "Broadcast map attack", description: "Which side of the overlay is attacking" })
	variables.push({ variableId: "broadcast_show_live_match", name: "Broadcast show live match", description: "Show live match on break" })
	variables.push({ variableId: "broadcast_advertise", name: "Broadcast advertise", description: "Advertise match on SLMN.GG" })
	variables.push({ variableId: "broadcast_show_cams", name: "Broadcast show cams", description: "Show player cams at the bottom of the screen" })
	variables.push({ variableId: "broadcast_observer_settings", name: "Broadcast observer settings", description: "List of observer settings that are active" })
	variables.push({ variableId: "match_id", name: "Match ID", description: "ID of the match" })
	variables.push({ variableId: "match_name", name: "Match name", description: "Automatic name of the match" })
	variables.push({ variableId: "match_codes", name: "Match codes", description: "TEAM vs TEAM shorter automatic name" })
	variables.push({ variableId: "match_codes_flippable", name: "Match codes (flippable)", description: "TEAM vs TEAM, following overlay flips" })
	variables.push({ variableId: "match_team1_code", name: "Match team1 code", description: "Code of team 1" })
	variables.push({ variableId: "match_team2_code", name: "Match team2 code", description: "Code of team 2" })
	variables.push({ variableId: "match_score_1", name: "Match score 1", description: "Score for team 1" })
	variables.push({ variableId: "match_score_2", name: "Match score 2", description: "Score for team 2" })
	variables.push({ variableId: "match_scores", name: "Match scores", description: "Both teams' scores" })
	variables.push({ variableId: "match_scores_flippable", name: "Match scores (flippable)", description: "Both teams' scores, following overlay flips" })
	variables.push({ variableId: "match_first_to", name: "Match first to", description: "Number of maps to win" })
	variables.push({ variableId: "match_is_complete", name: "Match is complete", description: "If one team has won the match" })
	variables.push({ variableId: "match_flip_teams", name: "Match flip teams", description: "If the overlay is flipped" })
	variables.push({ variableId: "match_left_code", name: "Match left code", description: "Code for the team on the left of the overlay" })
	variables.push({ variableId: "match_left_score", name: "Match left score", description: "Score for the team on the left of the overlay" })
	variables.push({ variableId: "match_right_code", name: "Match right code", description: "Code for the team on the right of the overlay" })
	variables.push({ variableId: "match_right_score", name: "Match right score", description: "Score for the team on the right of the overlay" });

	variables.push({ variableId: "current_map_name", name: "Current map name", description: "Name of the current map" });


	([1,2,3,4,5,6,7,8,9]).forEach(num => {
        variables.push({ variableId: `map_${num}_name`, name: `Map ${num} name`, description: `Name of map ${num}` });
	});
	([1,2,3,4,5,6]).forEach(num => {
		variables.push({ variableId: `staff_observer_${num}`, name: `Observer ${num} Name`, description: `Name for observer ${num} from match player relationships` })
		variables.push({ variableId: `staff_observer_${num}_code`, name: `Observer ${num} Code` })
		variables.push({ variableId: `staff_observer_${num}_remote_feed`, name: `Observer ${num} Remote Feed` })
	});

	(["producer", "observer", "lobby_admin", "observer_director", "replay_producer", "stats_producer"]).forEach(key => {
		variables.push({ variableId: `staff_${key}`, name: `Staff name: ${key}` });
		variables.push({ variableId: `staff_${key}_code`, name: `Staff code: ${key}` });
		variables.push({ variableId: `staff_${key}_id`, name: `Staff ID: ${key}` });
		variables.push({ variableId: `staff_${key}_remote_feed`, name: `Staff Remote Feed: ${key}` });
	});

	variables.push({ variableId: `staff_observer_number`, name: `Observer Number`, description: `Observer number for the currently connected client` });
	variables.push({ variableId: `observer_tally`, name: `Observer Tally Status` });

	variables.push({ variableId: `prediction_last`, name: `Last Prediction Action`, description: `Last sent prediction action` });


	["name", "code", "theme_logo_background", "theme_text_on_logo_background", "theme_color", "theme_text_on_theme", "theme_ready"].forEach(key => {
		[1,2].forEach(teamNum => {
			variables.push({ variableId: `team_${teamNum}_${key}`, description: `Team ${teamNum} ${key}` })
		});
		["left", "right"].forEach(teamSide => {
			variables.push({ variableId: `team_${teamSide}_${key}`, description: `Team ${teamSide} ${key}` })
		})
	});

    [1,2,3,4,5,6,7,8,9].forEach(num => {
        ["name", "battletag", "role"].forEach(key => {
            [1,2].forEach(teamNum => {
                variables.push({ variableId: `player_team_${teamNum}_player_${num}_${key}`, name: `Rostered Player - T${teamNum} P${num} - ${ucFirst(key)}`, description: `${key} of player ${num} on team ${teamNum}` })
            });
            ["left", "right"].forEach(teamSide => {
                variables.push({ variableId: `player_team_${teamSide}_player_${num}_${key}`, name: `Rostered Player - T${ucFirst(teamSide)} P${num} - ${ucFirst(key)}`, description: `${key} of player ${num} on team ${teamSide}` })
            })
        });
    });
	[1,2,3,4,5,6].forEach(num => {
        ["name", "battletag"].forEach(key => {
            [1,2].forEach(teamNum => {
                variables.push({ variableId: `player_cam_team_${teamNum}_player_${num}_${key}`, name: `Player Cam - T${teamNum} P${num} - ${ucFirst(key)}`, description: `${key} of player cam for player ${num} on team ${teamNum}` })
            });
            ["left", "right"].forEach(teamSide => {
                variables.push({ variableId: `player_cam_team_${teamSide}_player_${num}_${key}`, name: `Player Cam - T${ucFirst(teamSide)} P${num} - ${ucFirst(key)}`, description: `${key} of player cam for player ${num} on team ${teamSide}` })
            })
        });
    });

	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].forEach(num => {
		variables.push({ variableId: `gfx_${num}_short`, name: `GFX ${num} Short`, description: `Short descriptor for GFX ${num}` })
		variables.push({ variableId: `gfx_${num}_type`, name: `GFX ${num} Type`, description: `Type for GFX ${num}` })
		variables.push({ variableId: `gfx_${num}_id`, name: `GFX ${num} ID`, description: `ID for GFX ${num}` })
	});

	// variables.push({ variableId: 'base_resolution', name: 'Current base (canvas) resolution' })
	// variables.push({ variableId: 'output_resolution', name: 'Current  output (scaled) resolution' })
	// variables.push({ variableId: 'target_framerate', name: 'Current profile framerate' })
	// variables.push({ variableId: 'fps', name: 'Current actual framerate' })
	// variables.push({ variableId: 'cpu_usage', name: 'Current CPU usage (percentage)' })
	// variables.push({ variableId: 'memory_usage', name: 'Current RAM usage (in megabytes)' })
	// variables.push({ variableId: 'free_disk_space', name: 'Free recording disk space' })
	// variables.push({ variableId: 'render_missed_frames', name: 'Number of frames missed due to rendering lag' })
	// variables.push({ variableId: 'render_total_frames', name: 'Number of frames rendered' })
	// variables.push({ variableId: 'output_skipped_frames', name: 'Number of encoder frames skipped' })
	// variables.push({ variableId: 'output_total_frames', name: 'Number of total encoder frames' })
	// variables.push({ variableId: 'average_frame_time', name: 'Average frame time (in milliseconds)' })
	// variables.push({ variableId: 'recording', name: 'Recording State' })
	// variables.push({ variableId: 'recording_file_name', name: 'File name of the last completed recording' })
	// variables.push({ variableId: 'recording_path', name: 'File path of current recording' })
	// variables.push({ variableId: 'recording_timecode', name: 'Recording timecode' })
	// variables.push({ variableId: 'stream_timecode', name: 'Stream Timecode' })
	// variables.push({ variableId: 'stream_service', name: 'Stream Service' })
	// variables.push({ variableId: 'streaming', name: 'Streaming State' })
	// variables.push({ variableId: 'scene_active', name: 'Current active scene' })
	// variables.push({ variableId: 'scene_preview', name: 'Current preview scene' })
	// variables.push({ variableId: 'profile', name: 'Current profile' })
	// variables.push({ variableId: 'scene_collection', name: 'Current scene collection' })
	// variables.push({ variableId: 'current_transition', name: 'Current transition' })
	// variables.push({ variableId: 'transition_duration', name: 'Current transition duration' })
	// variables.push({ variableId: 'current_media_name', name: 'Source name for currently playing media source' })
	// variables.push({ variableId: 'current_media_time_elapsed', name: 'Time elapsed for currently playing media source' })
	// variables.push({ variableId: 'current_media_time_remaining', name: 'Time remaining for currently playing media source' })
	// variables.push({ variableId: 'replay_buffer_path', name: 'File path of the last replay buffer saved' })

	//Defaults

	//Source Specific Variables
	// for (let s in this.mediaSourceList) {
	// 	let mediaSourceName = this.mediaSourceList[s].id
	// 	variables.push({ variableId: 'media_status_' + mediaSourceName, name: 'Media status for ' + mediaSourceName })
	// 	variables.push({ variableId: 'media_file_name_' + mediaSourceName, name: 'Media file name for ' + mediaSourceName })
	// 	variables.push({ variableId: 'media_time_elapsed_' + mediaSourceName, name: 'Time elapsed for ' + mediaSourceName })
	// 	variables.push({
	// 		variableId: 'media_time_remaining_' + mediaSourceName,
	// 		name: 'Time remaining for ' + mediaSourceName,
	// 	})
	// 	this.setVariable(
	// 		'media_file_name_' + mediaSourceName,
	// 		this.sources[mediaSourceName]?.settings?.local_file
	// 			? this.sources[mediaSourceName].settings.local_file.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/)
	// 			: ''
	// 	)
	// }
	//
	// for (let s in this.sources) {
	// 	let source = this.sources[s]
	// 	if (source.inputKind === 'text_ft2_source_v2' || source.inputKind === 'text_gdiplus_v2') {
	// 		variables.push({ variableId: 'current_text_' + source.sourceName, name: 'Current text for ' + source.sourceName })
	// 		this.setVariable('current_text_' + source.sourceName, source.settings?.text ? source.settings.text : '')
	// 	}
	// 	if (source.inputKind === 'image_source') {
	// 		variables.push({
	// 			variableId: 'image_file_name_' + source.sourceName,
	// 			name: 'Image file name for ' + source.sourceName,
	// 		})
	// 		this.setVariable(
	// 			'image_file_name_' + source.sourceName,
	// 			source.settings?.file ? source.settings.file.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/) : ''
	// 		)
	// 	}
	//
	// 	if (source.inputAudioTracks) {
	// 		variables.push({ variableId: 'volume_' + source.sourceName, name: 'Current volume for ' + source.sourceName })
	// 		variables.push({ variableId: 'mute_' + source.sourceName, name: 'Current mute status for ' + source.sourceName })
	// 		variables.push({
	// 			variableId: 'monitor_' + source.sourceName,
	// 			name: 'Current audio monitor status for ' + source.sourceName,
	// 		})
	// 		variables.push({
	// 			variableId: 'sync_offset_' + source.sourceName,
	// 			name: 'Current audio monitor status for ' + source.sourceName,
	// 		})
	// 		variables.push({
	// 			variableId: 'balance_' + source.sourceName,
	// 			name: 'Current audio monitor status for ' + source.sourceName,
	// 		})
	// 	}
	// }

	this.setVariableDefinitions(variables)
}
