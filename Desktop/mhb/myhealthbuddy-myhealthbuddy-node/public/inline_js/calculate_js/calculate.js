
    form_structure_1 = [
    [{
            "form_identifier": "",
            "name": "fieldname2",
            "shortlabel": "",
            "index": 0,
            "ftype": "fnumber",
            "userhelp": "",
            "userhelpTooltip": false,
            "csslayout": "",
            "title": "Height (cm)",
            "predefined": "180",
            "predefinedClick": false,
            "required": false,
            "size": "large",
            "thousandSeparator": "",
            "decimalSymbol": ".",
            "min": "30",
            "max": "250",
            "dformat": "number",
            "formats": ["digits", "number"],
            "fBuild": {},
            "parent": ""
        }, {
            "form_identifier": "",
            "name": "fieldname3",
            "shortlabel": "",
            "index": 1,
            "ftype": "fdropdown",
            "userhelp": "",
            "userhelpTooltip": false,
            "csslayout": "",
            "title": "Sex",
            "size": "large",
            "required": false,
            "choiceSelected": "Male",
            "showDep": false,
            "choices": ["Male", "Female"],
            "fBuild": {},
            "parent": "",
            "choicesVal": ["Male", "Female"],
            "choicesDep": [
                [],
                []
            ]
        },
        {
            "form_identifier": "",
            "name": "fieldname4",
            "shortlabel": "",
            "index": 2,
            "ftype": "fCalculated",
            "userhelp": "",
            "userhelpTooltip": false,
            "csslayout": "",
            "title": "Ideal Weight",
            "predefined": "",
            "required": false,
            "size": "large",
            "toolbar": "default|mathematical",
            "eq": "Math.round((fieldname2-100)*(fieldname3=='Male'?0.90:0.85))",
            "suffix": "",
            "prefix": "",
            "decimalsymbol": ".",
            "groupingsymbol": "",
            "dependencies": [{
                "rule": "",
                "complex": false,
                "fields": [""]
            }],
            "readonly": true,
            "hidefield": false,
            "fBuild": {},
            "parent": ""
        }
    ], {
        "0": {
            "title": "",
            "description": "",
            "formlayout": "top_aligned",
            "autocomplete": 1,
            "formtemplate": "",
            "evalequations": 1
        },
        "formid": "cp_calculatedfieldsf_pform_1"
    }
];


    var cp_calculatedfieldsf_fbuilder_config_1 = {
        "obj": {
            "pub": true,
            "identifier": "_1",
            "messages": {
                "required": "This field is required.",
                "email": "Please enter a valid email address.",
                "datemmddyyyy": "Please enter a valid date with this format(mm\/dd\/yyyy)",
                "dateddmmyyyy": "Please enter a valid date with this format(dd\/mm\/yyyy)",
                "number": "Please enter a valid number.",
                "digits": "Please enter only digits.",
                "max": "Please enter a value less than or equal to {0}.",
                "min": "Please enter a value greater than or equal to {0}.",
                "previous": "Previous",
                "next": "Next",
                "pageof": "Page {0} of {0}",
                "minlength": "Please enter at least {0} characters.",
                "maxlength": "Please enter no more than {0} characters.",
                "equalTo": "Please enter the same value again."
            }
        }
    } /* ]]&gt; */


    var TRX_ADDONS_STORAGE = {
        "ajax_nonce": "c8b0d0ec6f",
        "vc_edit_mode": "0",
        "popup_engine": "magnific",
        "user_logged_in": "0",
        "scroll_to_anchor": "1",
        "update_location_from_anchor": "0",

    };

    var MELANIE_HANSON_STORAGE = {
        "ajax_url": "http:\/\/melanie-hanson.themerex.net\/wp-admin\/admin-ajax.php",
        "ajax_nonce": "c8b0d0ec6f",
        "site_url": "http:\/\/melanie-hanson.themerex.net",
        "user_logged_in": "",
        "mobile_layout_width": "959",
        "menu_cache": "1",
        "menu_stretch": "1",
        "menu_animation_in": "fadeInUpSmall",
        "menu_animation_out": "fadeOutDownSmall",
        "background_video": "",
        "use_mediaelements": "1",
        "message_maxlength": "1000",
        "site_scheme": "scheme_default",
        "admin_mode": "",
        "email_mask": "^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$",
        "strings": {
            "ajax_error": "Invalid server answer!",
            "error_global": "Error data validation!",
            "name_empty": "The name can&#039;t be empty",
            "name_long": "Too long name",
            "email_empty": "Too short (or empty) email address",
            "email_long": "Too long email address",
            "email_not_valid": "Invalid email address",
            "text_empty": "The message text can&#039;t be empty",
            "text_long": "Too long message text",
            "search_error": "Search error! Try again later.",
            "send_complete": "Send message complete!",
            "send_error": "Transmit failed!"
        },
        "menu_hover": "fade",
        "menu_hover_color": "#ff194f",
        "button_hover": "antiman",
        "alter_link_color": "#4c4c4c"
    };

    var mejsL10n = {
        "language": "en-US",
        "strings": {
            "Close": "Close",
            "Fullscreen": "Fullscreen",
            "Turn off Fullscreen": "Turn off Fullscreen",
            "Go Fullscreen": "Go Fullscreen",
            "Download File": "Download File",
            "Download Video": "Download Video",
            "Play": "Play",
            "Pause": "Pause",
            "Captions\/Subtitles": "Captions\/Subtitles",
            "None": "None",
            "Time Slider": "Time Slider",
            "Skip back %1 seconds": "Skip back %1 seconds",
            "Video Player": "Video Player",
            "Audio Player": "Audio Player",
            "Volume Slider": "Volume Slider",
            "Mute Toggle": "Mute Toggle",
            "Unmute": "Unmute",
            "Mute": "Mute",
            "Use Up\/Down Arrow keys to increase or decrease volume.": "Use Up\/Down Arrow keys to increase or decrease volume.",
            "Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds.": "Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds."
        }
    };
    var _wpmejsSettings = {
        "pluginPath": "\/wp-includes\/js\/mediaelement\/"
    };

    
