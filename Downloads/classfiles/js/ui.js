var UI = function() {

}

UI.prototype = {
  constructor: UI,
  updatePostImage: function( imageUrl ) {
    document
    .getElementById('post-image')
    .src = imageUrl;
  },
  updateLikesString: function( likesString ) {
    document
      .getElementsByClassName('likes-container')[0]
      .innerHTML = likesString;
  },
  displayOverlay: function( style ) {
    document
      .getElementsByClassName('overlay')
      [0]
      .style.display = style;
  },
  updateLoop: function( likesArr ) {
    var loop = '';
    likesArr.forEach(function( singleLike ) {
      loop = loop + '<div class="single-like"><div class="left-image"><img src="'+ singleLike.imageUrl +'"></div><div class="right-text">'+ singleLike.name +' likes this!</div></div>';
    })

    document
    .getElementsByClassName('loop')
    [0].innerHTML = loop;
  },
  updateComment: function( commArr ){
    var loop = '';
    commArr.forEach(function( singlecomment ) {
      loop = loop + '<tr class="tr-class tr"><td><img src="'+ singlecomment.imageUrl +'" height="50px" width="50px"></td><td>'+ singlecomment.name +'</td><td>'+ singlecomment.comment +' </td></tr>';
    })
    document
    .getElementsByClassName('table-display')
    [0].innerHTML = loop;

}
}
