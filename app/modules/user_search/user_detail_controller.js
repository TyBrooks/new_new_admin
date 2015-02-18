angular.module('adminApp.userSearch')

.controller('UserDetailCtrl',
  ['$scope', '$http', '$stateParams', 'settings',
  function($scope, $http, $stateParams, settings) {
      var apiURL = settings.apiURL;
    
      $scope.getUser = function(userId) {
          $http.get(apiURL + "/accounts/get_user/" + userId)
              .success(function(data, status, headers, config) {
                  $scope.user = data;
                  if(data.userType == 'Installable')
                      $scope.getPlugins($routeParams.id);
              })
              .error(function(data, status, headers, config) {
                  $scope.error = {"type" : "error", "flag": "times", "msg": data}
              });
      }
      $scope.getPlugins = function(userId) {
          $http.get(apiURL + "/accounts/get_plugins/" + userId)
              .success(function(data, status, headers, config) {
                  $scope.plugins = data;
              });
      }
      $scope.getUser($stateParams.id);

}])