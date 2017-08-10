var Api = function() {

};

Api.prototype = {
constructor: Api,
get: function( cb ) {
cb({
    post: {
        id:100,
        imageUrl: './images/1.jpg'
    },
    likes: [{
     name:'Manmohan',
     imageUrl: './images/1.jpg'
    },
    {
     name:'Manmohan',
     imageUrl: './images/1.jpg'
    },
    {
     name:'Manmohan',
     imageUrl: './images/1.jpg'
    },
    {
     name:'Manmohan',
     imageUrl: './images/1.jpg'
    },]

})
}
}
