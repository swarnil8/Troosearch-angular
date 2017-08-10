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
  updateCommentString: function ( commentArr ) {
    document
    .getElementsByClassName('comment-section')
    [0].innerHTML = commentArr;
  }
}
