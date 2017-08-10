var UI = function(domElement) {

  this.searchB = domElement.inputdiv.input;
  this.searchBox = $(domElement.inputdiv.input);

  this.inputSuggestion = $(domElement.inputdiv.inputSuggestion);
  this.suggestionBox = $(domElement.inputdiv.suggestionBox);
  this.loadingBox = $(domElement.inputdiv.loadingBox);

  this.singleBox = $(domElement.inputdiv.singleSuggestion);
  this.autocompleteVal = domElement.autocomplete;
  this.keyVal = domElement.keyboardProperty;
  key = domElement.key;

}

UI.prototype = {
  constructor: UI,
  display: function(element, property) {
    element.css("display", property);
  },

  displaySearchResult: function(dataArray, keyword) {
    var loop = "";

    if (dataArray.length == 0)
      loop += 'No Result';
    else {
      dataArray.forEach(function(element) {


        element[key] = element[key].toLowerCase();
        var element = element[key];
        element = element.replace(new RegExp(keyword, 'g'), '<span class="highlight">' + keyword + '</span>');

        loop += '<div class="display-suggestion">' + element + '</div>';
      });
    }
    this.singleBox.html(loop);

    $("#" + document.activeElement.id).siblings(this.suggestionBox).children(this.singleBox).children(".display-suggestion").first().addClass("active");
    $(this.inputSuggestion).val($('div.active').text());
  },

  clear: function() {
    this.singleBox.html("");
    $(this.inputSuggestion).val("");
  },



  autocompleteOnRightArrow: function() {

    if (this.autocompleteVal == "true")
      this.searchBox.val($(this.inputSuggestion).val());
  },

  autocompleteOnClick: function(e, className) {
    if (this.autocompleteVal == "true") {
      if (e.target.className.indexOf(className) != -1) {
        var innerHTML = $(e.target).text();
        this.searchBox.val(innerHTML);
        $(this.inputSuggestion).val(innerHTML);
      }
    }
  },

  autocompleteOnDownArrow: function(e) {
    if (this.keyVal == "true") {
      var $hlight = $("#" + document.activeElement.id).siblings(this.suggestionBox).children(this.singleBox).children('div.active');



      if (e.keyCode == 40) {
        $hlight.removeClass('active').next().addClass('active');
        if ($hlight.next().length == 0) {

          $("#" + document.activeElement.id).siblings(this.suggestionBox).children(this.singleBox).children(".display-suggestion").first().addClass("active");

        }
      } else if (e.keyCode === 38) {
        $hlight.removeClass('active').prev().addClass('active');
        if ($hlight.prev().length == 0) {
          $("#" + document.activeElement.id).siblings(this.suggestionBox).children(this.singleBox).children(".display-suggestion").last().addClass("active");
        }
      }

      $(this.inputSuggestion).val($('div.active').text());
    }
  }
}
