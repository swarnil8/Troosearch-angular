$.fn.gsearch = function(domElement) {


    var ui = new UI(domElement);
    var events = new Events(ui, domElement);
    events.capture();
  };

  $(".troosearch-inputs").gsearch({
    inputdiv: {
      input: '#input',
      inputSuggestion: '#input-suggestion',
      suggestionBox: '#suggestion-box',
      singleSuggestion: '#single-suggestion',
      loadingBox: '#Loading-suggestion'
    },
    autocomplete: 'true',
    keyboardProperty: 'true',
    urlStart: "http://35.154.56.172/api/project-search/Gurgaon/",
    urlEnd: "/Flats",
    keyArray: 'data',
    key: 'name'
  });


  
