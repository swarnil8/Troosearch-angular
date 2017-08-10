var TRX_ADDONS_STORAGE = {
    "ajax_nonce": "a16caca13f",
    "vc_edit_mode": "0",
    "popup_engine": "magnific",
    "user_logged_in": "0",
    "scroll_to_anchor": "1",
    "update_location_from_anchor": "0",
    "msg_sc_googlemap_not_avail": "Googlemap service is not available",
    "msg_sc_googlemap_geocoder_error": "Error while geocode address"
};

var MELANIE_HANSON_STORAGE = {
    "ajax_url": "http:\/\/melanie-hanson.themerex.net\/wp-admin\/admin-ajax.php",
    "ajax_nonce": "a16caca13f",
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


(function($) {
  var _API = 'http://35.154.207.127/blog/api/get_recent_posts/?count=5';
  var _MONTHS = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  $( document ).ready(function() {
    $.get( _API )
    .done(function( data ) {

      var posts = data.posts;
      if( posts.length == 5 ) {
          $('.mainul li')
          .each(function( index, elem ) {
            var mediaPoster = $( elem ).find( '.esg-media-poster' );

            mediaPoster.attr('src', posts[index].attachments[0].url);
            mediaPoster.css('background-image', 'url('+posts[index].attachments[0].url+')');

            if(  index == 0 ) {
              var anchor = $( elem ).find('.eg-custom-2-element-0');
            } else {
              var anchor = $( elem ).find( 'a' );
            }

            anchor.attr('href', posts[index].url);
            anchor.html( posts[index].title );
          });

        //Show articles
        $('#articles').show();
      } else {
        //Hide pagination
        $('a[href="#articles"]').hide();
      }
    });
  });
})(jQuery);
