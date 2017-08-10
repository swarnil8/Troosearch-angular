var Api = function() {
  this.sampleObj = {
    "error": false,
    "data": [
      {
        "name": "DLF P",
        "locality": "Sector 51",
        "city": "Gurgaon"
      },
      {
        "name": "DLF Phase 2",
        "locality": "Sector 53",
        "city": "Gurgaon"
      }
    ]
  }
}


Api.prototype = {
  constructor: Api,
  getSearchResults: function( keyword, callback ) {
    var _this = this;
    setTimeout(function() {
      callback( _this.sampleObj)

    },0);
  }
};
