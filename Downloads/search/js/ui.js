var UI = function(){
  this.input=document.getElementById('input');
  this.inputHint=document.getElementById('input-hint');
  this.suggestionBox=document.getElementById('suggestion-box');
  this.singleSuggestion=document.getElementById('suggestion-comment');
  this.single=document.getElementsByClassName('single-suggestion')[0];
  this.loading=document.getElementsByClassName('loading-suggestion')[0];
  this.document=document;
};
UI.prototype =  {
  constructor:UI,
  display:function (element,property) {
    element.style.display=property;

  },
  updateSearch: function( e, className ) {
  if( e.target.className.indexOf( className ) != -1 ) {
    var innerHTML = e.target.innerHTML;
    this.input.value = innerHTML;
  }
},

};
