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
    comment: [{
      id: 201,
      name: 'Swarnil',
      description: 'Hiii! Wassup??'
    },{
      id: 202,
      name: 'Manmohan',
      description: 'M Fyn!! Hows You?'
    },{
      id: 203,
      name: 'Mohit',
      description: 'Cooool!!'
    }]
  };

};

Api.prototype = {
  constructor: Api,
  getLikes: function( cb ) {
     cb( this.sampleObj );
  }
}
