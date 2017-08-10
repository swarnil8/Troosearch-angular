var Api = function() {
  this.sampleObj = {
    post: {
      id: 1,
      imageUrl: './images/1.jpg'
    },
    likes: [{
      id: 100,
      name: 'Manmohan',
      imageUrl: './images/1.jpg'
    }, {
      id: 101,
      name: 'Swarnil',
      imageUrl: './images/1.jpg'
    }, {
      id: 102,
      name: 'Mahima',
      imageUrl: './images/1.jpg'
    }, {
      id: 103,
      name: 'Kamal',
      imageUrl: './images/1.jpg'
    },{
      id: 104,
      name: 'Mohit',
      imageUrl: './images/1.jpg'
    },{
      id: 105,
      name: 'Kamal',
      imageUrl: './images/1.jpg'
    }],
    comments:[{
      id:100,
      name: 'Swarnil',
      comment:'Hey Wassup!!',
      imageUrl: './images/2.jpg'
    },
    {
      id:101,
      name: 'Manmohan',
      comment:'M gud!! U tell??',
      imageUrl: './images/3.jpg'
    },
    {
      id:101,
      name: 'Shubham',
      comment:'Hey there!!!',
      imageUrl: './images/1.jpg'
    }]
  };

};

Api.prototype = {
  constructor: Api,
  getObj: function( cb ) {
     cb( this.sampleObj );
  },
/*  getComments: function( cb ) {
     cb( this.sampleObj );
  }*/
}
