var Likes = function() {
  this.likes;
};

Likes.prototype = {
  constructor: Likes,
  returnLikesString: function( likesArr ) {
      var str = '';
      if( likesArr.length == 0 ) {
        str = 'No one likes this!';
      } else if( likesArr.length == 1 ) {
        str = likesArr[0].name + ' likes this!'
      } else if( likesArr.length == 2 ) {
        str = likesArr[0].name + ' and ' + likesArr[1].name + ' likes this!'
      } else {
        str = likesArr[0].name + ',' + likesArr[1].name + ' and ' + ( likesArr.length - 2 ) + ' others like this!'
      }

      return str;
  }
}
