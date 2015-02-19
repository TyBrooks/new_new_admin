angular.module('adminApp.accountSearch', [])

.controller('AccountSearchCtrl', ['$scope', '$http', 'settings', function($scope, $http, settings) {
	    //TODO update when account has gender or profile image url
	    $scope.searchAccounts = function(input, pageNo, limit) {
	        if(input) {
                $http.get(settings.apiURL + "/search/accounts?q=" + input)
                    .success(function(data, status, headers, config) {
                        $scope.accountResults = data;
                    })
                    .error(function(data, status, headers, config) {
                        alert(data);
                    });
	        } else {
	            alert("Input is invalid")
	        }
    }
} ] );