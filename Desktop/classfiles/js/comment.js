var Comment = function() {
  this.comment;
};

Comment.prototype = {
  constructor: Comment,
  returnCommentString: function( commentArr ) {
      var str = '';
      if( commentArr.length == 0 ) {
        str = 'No one comment this!';
      } else if( commentArr.length == 1 ) {
        str = commentArr[0].description + 'comment this';
      } else if( commentArr.length == 2 ) {
        str = commentArr[0].description + ' and ' + commentArr[1].description + ' comment this!';
      } else {
        str = commentArr[0].name + ',' + commentArr[1].name + ' and ' + ' others comment this!';
      }

      return str;
  }
}
