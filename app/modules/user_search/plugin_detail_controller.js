angular.module('adminApp.accountSearch')

.controller('PluginDetailCtrl',
    ['$scope', '$http', '$stateParams', 'settings',
    function($scope, $http, $stateParams, settings) {
    
    var apiURL = settings.apiURL;
    
    $scope.getPlugin = function(pluginId) {
        $http.get(apiURL + "/plugins/" + pluginId)
            .success(function(data, status, headers, config) {
                $scope.plugin = data;
            })
            .error(function(data, status, headers, config) {
                $scope.error = {"type" : "error", "flag": "times", "msg": data}
            });
    }
    $scope.updateParams = function() {
        var plugin = $scope.plugin;
        $http.post(apiURL + "/plugins/update", plugin)
            .success(function(data, status, headers, config) {
                $scope.error = {"type" : "success", "flag": "check", "msg": "Updated successfully!"}
            })
            .error(function(data, status, headers, config) {
                $scope.error = {"type" : "error", "flag": "times", "msg": data}
            });
    }
    $scope.getPlugin($stateParams.id);
}]);