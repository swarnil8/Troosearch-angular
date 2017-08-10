var Api = function( ui ) {
  this.ui = ui;
  this.sampleObj={
    "error":false,
    "data":[
      {"name":"Abhas Apartment","locality":"Sector 56","city":"Gurgaon"},
      {"name":"Adani Samsara","locality":"Sector 60","city":"Gurgaon"},
      {"name":"Adel Cosmocity","locality":"Sector 103","city":"Gurgaon"},
      {"name":"Adel Cosmocourt","locality":"Sector 86","city":"Gurgaon"},
      {"name":"AIPL The Peaceful Homes","locality":"Sector 70A","city":"Gurgaon"}
  ]
};
};

Api.prototype = {
  constructor: Api,
  getSearchResult: function( keyword, callback ) {
    if( keyword ) {
      

      var xmlhttp = new XMLHttpRequest();
      var url = "http://35.154.56.172/api/project-search/Gurgaon/"+ keyword +"/Flats";

      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var json = JSON.parse(this.responseText);
              callback( json );
          }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send();



          }
          else{
            this.ui.display( this.ui.suggestionBox, 'none' );
            this.ui.display( this.ui.loading, 'none' );
            this.ui.display( this.ui.singleSuggestion, 'none' );
          }
      }
}
