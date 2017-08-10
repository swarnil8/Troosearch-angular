// singletone


if (window == chrome.extension.getBackgroundPage()) {

	(function(){
		Prefs = function(){
		
		}
		
		Prefs.prototype = {
			_prefsPrefix: "prefs.",
			_changeListeners: [],
			
			// default values
			_defaults: {
				"install_time": 0,
				"snif_ad_signs": "",
				"last_ad_signs_download_time": "",
				"last_run_version": "",
				"is_first_run": true,
				
				"popup.display_slow_download_hint": true,						
				
				"fvd.enable_mp4": true,
				"fvd.enable_3gp": false,
				"fvd.enable_flv": true,
				"fvd.enable_mov": true,
				"fvd.enable_avi": true,
				"fvd.enable_wmv": true,
				"fvd.enable_asf": true,
				"fvd.enable_swf": true,
				"fvd.enable_webm": true,
				"fvd.trigger_video_more" : "video_100kb",
				"popup.display_rate": true,		

				"fvd.update_message.enable": 0,	
				"fvd.rate_message.show": 0,

				"fvd.original_filename": false,
				"fvd.display_vk_button": true,
				"fvd.display_facebook_button": true,
				
				"fvd.show_sovet_smart_pause": true,
				
				"popup.display_hints_1": true,
				"popup.display_hints_2": true,
				"popup.display_hints_3": true,
				
			},
			
			dump: function( callback ){
				
				var result = {};
				for( var k in this._defaults ){
					result[k] = this.get(k);
				}
				
				callback(result);
				
			},
			
			toggle: function( name ){
				var newVal = !_b( this.get( name ) );
				this.set( name, newVal );
			},
			
			defaultValue: function( settingName ){
				if (typeof this._defaults[settingName] != "undefined") {
					return this._defaults[settingName];
				}
				else {
					return null;
				}
			},
			
			restore: function( settingName ){
				if (typeof this._defaults[settingName] != "undefined") {
					this.set( settingName, this._defaults[settingName] );
				}
				else {
		
				}
			},
			
			get: function(name, defaultValue){
			
				if (typeof defaultValue == "undefined") {
					if (typeof this._defaults[name] != "undefined") {
						defaultValue = this._defaults[name];
					}
					else {
						defaultValue = null;
					}
				}
				
				var name = this._name(name);
				if (typeof localStorage[name] == "undefined") {
					return defaultValue;
				}
				
				return localStorage[name];
			},
			
			set: function(name, value){
				var oldValue = this.get(name);
				
				var badListeners = [];
				
				if ( _r(oldValue) != _r(value) ) {
					localStorage[this._name(name)] = value;
					// call change listeners					
					for (var i = 0; i != this._changeListeners.length; i++) {
						var listener = this._changeListeners[i];
						// try catch exception because listener exception cannot breaks running listeners chain
						try{
							listener(name, value);
						}
						catch( ex ){
							badListeners.push( listener );
						}
												
					}
				}
				
				for( var i = 0; i != badListeners.length; i++ ){
					this.removeChangeListener( badListeners[i] );
				}
				
			},
			
			addChangeListener: function(listener){
				if (this._changeListeners.indexOf(listener) != -1) {
					return;
				}
				this._changeListeners.push(listener);
			},
			
			removeChangeListener: function(listener){
				var index = this._changeListeners.indexOf(listener);
				if (index != -1) {
					this._changeListeners.splice(index, 1);
				}
			},
			
			_name: function(name){
				return this._prefsPrefix + name;
			}
		}
		
		this.Prefs = new Prefs();
	}).apply( fvdSingleDownloader );
	
}
else{
	fvdSingleDownloader.Prefs = chrome.extension.getBackgroundPage().fvdSingleDownloader.Prefs;
}
