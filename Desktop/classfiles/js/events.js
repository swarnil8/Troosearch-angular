var Events = function( ui ) {
  this.ui = ui;
};

Events.prototype = {
  constructor: Events,
  init: function() {
    var _this = this;
    document
    .getElementsByClassName('likes-container')
    [0]
    .addEventListener('click', function() {
      _this.ui.displayOverlay( 'block' );
    });

    document
    .getElementsByClassName('cross-icon')
    [0]
    .addEventListener('click', function() {
      _this.ui.displayOverlay( 'none' );
    });
  }
}
