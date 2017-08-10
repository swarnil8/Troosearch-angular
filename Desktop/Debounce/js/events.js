var Events = function (api) {
  this.input = $('#main-input');
  this.api = api;
  this.timeout = null;
}

Events.prototype ={
  constructor : Events,
  init: function () {
    var _this = this;
    this.input.on('keydown', function () {
      var $this = this;
      clearTimeout($this.timeout);
      $this.timeout = setTimeout(function() {
        _this.api.callAPI($( $this ). val());
      },1000);
    });
  }
}
