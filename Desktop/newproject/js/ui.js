var Ui = function() {
  this.searchBox = document.getElementById('search-property');
  this.suggestionBox = document.getElementById('suggestion-box');
  this.loading = document.getElementById( 'loading-suggestions' );
}

Ui.prototype = {
  constructor: Ui,
  display: function( element,property) {
    element.style.display = property;
  }
}
