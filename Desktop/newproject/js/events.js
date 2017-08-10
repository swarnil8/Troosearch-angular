var Events = function( ui, api ) {
this.ui = ui;
this.api = api;
}

Events.prototype = {
  constructor: Events,
  keydownFn: function( e, _this ) {
    setTimeout(function() {
      var keyword = e.target.value;

      _this.ui.display( _this.ui.suggestionBox, 'inline-block' );
      _this.ui.display( _this.ui.loading, 'none' ); 
  //   _this.api.getSearchResults( keyword, function(obj) {
        //if(  !obj.console.error(); )
  //},
});
},
  capture: function() {
    var _this = this;
    this.ui
    .searchBox
    .addEventListener( 'keydown' , function( e ) {
      _this.keydownFn( e,_this );
    })
  }
};
