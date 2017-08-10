angular
  .module('Aashi')
  .controller('ManmohanController', ['$scope', '$rootScope', ManmohanFunction]);

    function ManmohanFunction( $scope, $rootScope) {
    $scope.fruits = [{
      name: 'apple',
      cost:500
    },{
      name: 'apple',
      cost:500
    },{
      name: 'apple',
      cost:500
    },{
      name: 'apple',
      cost:500
    }];

    $scope.clickMe = function( e ) {
      $scope.fruits.push({
        name:'strawberry',
        cost:'600'
      });
    }
    
  }
