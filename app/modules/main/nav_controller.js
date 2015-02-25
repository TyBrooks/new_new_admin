'use strict';

angular.module('adminApp.nav', [])

.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {
  $scope.user = { name: "" };
  
  $scope.showNav = true;
  
  $scope.toggleNav = function() {
    $scope.showNav = !$scope.showNav;
  }

  $scope.handleAuthFailure = function() {
    console.log("auth Failed");
  }

  var init = function(){
    if ( auth.success ) {
      $scope.user = auth.data;
    } else {
      $scope.handleAuthFailure();
    }
  };
  
  init();
}]);