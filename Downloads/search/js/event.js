var Events=function(ui,api){
  this.ui=ui;
  this.api=api;
};
Events.prototype={
  constructor:Events,
  keydownFn:function(e,_this){

    setTimeout(function() {
      var keyword=e.target.value;
      // console.log(_this);

      _this.removeSingleChild();
      _this.ui.display(_this.ui.suggestionBox, 'inline-block');
      _this.api.getSearchResult(keyword,function (obj) {
        if(!obj.error){
        var search=obj.data;

        _this.hintShow(e,obj.data);
        search.forEach(function(simple){
          var dom = document.createElement('div');
          dom.className = 'single-suggestion';
          dom.innerHTML = simple.name;
          _this.ui.singleSuggestion.appendChild(dom);
          _this.ui.display(_this.ui.singleSuggestion,'block')
          _this.ui.display(_this.ui.loading,'none')

        // console.log(simple);
        // _this.keyFn(e,_this)
        });

      };
    });
  },0);
},
hintShow:function (e,m) {
  var _this=this;
  if(e.keyCode==39){
    if(m[0].name==undefined){
      _this.ui.inputHint.value = " ";

    }
    else{
      var innerHTML = m[0].name;

    this.ui.input.value = innerHTML;
    this.ui.display(this.ui.suggestionBox,'none')

  }
}
else{
  if(m[0].name==undefined){
    _this.ui.inputHint.value = " ";

  }else{
  var innerHTML = m[0].name;

_this.ui.inputHint.value = innerHTML;
}
}
},
// keyFn:function(e,_this){
//    if (e.keyCode == 38 || e.keyCode == 40){
//     //  this.ui.single.style.backgroundColor="black";
//     console.log(this.ui.single);
//    }
//
// },
  capture:function(){
    var _this=this;
    this.ui
    .input
    .addEventListener('keydown',function (e) {
      _this.keydownFn(e,_this);
      _this.hintShow(e,e.target.value);
      // _this.keyFn(e,_this);

      // console.log(_this);
    });


    this
    .ui
    .document
    .addEventListener('click',function(e){
      _this.ui.updateSearch(e,'single-suggestion');
    });

  },

  removeSingleChild:function(){
    var _this=this;
    var elements= [];

    this.ui.display( this.ui.loading, 'block' );
    this.ui.display( this.ui.singleSuggestion, 'none' );
    // console.log(_this.ui.singleSuggestion.childNodes);
    // console.log(this.ui.singleSuggestion.childNodes);
    // m=_this.ui.singleSuggestion;
    // n=_this.ui.single;
    // // alert('backspace clicked')
    // console.log(m);
    this.ui.singleSuggestion.childNodes.forEach(function( singleChild ) {
      elements.push( singleChild );
      //  console.log(elements.push(singleChild));
    });

    elements.forEach(function( singleChild ) {
      this.ui.singleSuggestion.removeChild( singleChild );
      //  console.log(this.ui.singleSuggestion.removeChild( singleChild ));
    });
}
}
