angular.module('adminApp.sidDecoder', [])
.controller('SidDecoderCtrl', ['$scope', '$http', 'settings', function($scope, $http, settings) {
  $scope.decodeSID = function(sid) {
        $http.get(settings.apiURL + "/optstools/decode_sid/" + sid)
            .success(function(data, status, headers, config) {
                $scope.output = data;
            })
            .error(function(data, status, headers, config) {
                alert(data);
            });
  }
}]);