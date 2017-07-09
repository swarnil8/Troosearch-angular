angular
.module('TrooSearch',[])
.controller('TrooController',['$scope',TrooFunction]);

function TrooFunction( $scope ){

  $scope.search = function( e ){
    if(e.key == undefined)
    $scope.check = false;
    else {
      $scope.check = true;
    }

  }


  $scope.property = [{
    name: 'Karmyogi Apartments',
    location: 'Gurgaon',

  },{
    name: 'Shree Awas',
    location: 'Dwarka',
  },{
    name: 'Classic Apartments',
    location: 'Dwarka',
  },{
    name: 'Chitrakoot Dham ',
    location: 'Dwarka',
  },{
    name: 'Sunny Valley',
    location: 'Dwarka',
  },{
    name: 'Bhawalpur Apartments',
    location: 'Dwarka',
  }];

  //$scope.suggestion = [];
  //$scope.click = function( e ){
    //$scope.suggestion.push($scope.searchText);
  //}

}
