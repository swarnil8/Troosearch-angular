//Initialize Objects
var api = new Api();
var ui = new UI();
var likes = new Likes();
var Events = new Events( ui );
var comment = new Comment();

//Initialize dom events
Events.init();

api.getLikes(function( resObj ) {
  console.log( resObj );
  var likesStr = likes.returnLikesString( resObj.likes );
  var commentStr = comment.returnCommentString( resObj.comment );
  ui.updateLikesString( likesStr );
  ui.updatePostImage( resObj.post.imageUrl );
  ui.updateLoop( resObj.likes );
  ui.updateCommentString( commentStr );
  ui.updateCommentString( resObj.comment );
});
