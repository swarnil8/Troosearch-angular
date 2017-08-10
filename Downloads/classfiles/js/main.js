//Initialize Objects
var api = new Api();
var ui = new UI();
var likes = new Likes();
var Events = new Events( ui );

//Initialize dom events
Events.init();

api.getObj(function( resObj ) {
  console.log( resObj );
  var likesStr = likes.returnLikesString( resObj.likes );
  ui.updateLikesString( likesStr );
  ui.updatePostImage( resObj.post.imageUrl );
  ui.updateLoop( resObj.likes );
  ui.updateComment(resObj.comments);
});

/*api.getComments(function (resObj) {
  ui.updateComment(resObj.comments);
})*/
