angular.module('adminApp.whiteListedIps', [])

.controller('WhiteListedIpController', [ '$scope', '$http', 'settings', function($scope, $http, settings) {
      var apiURL = settings.apiURL;
    
			$scope.getWhiteListedIps = function() {
				$http.get(apiURL + "/opstools/whitelisted_ips").success(
						function(data, status, headers, config) {
							$scope.whitelistedIps = data;
						}).error(function(data, status, headers, config) {
					alert(data);
				});
			}

			$scope.saveWhiteListedIps = function() {
				$http.post(
          apiURL + "/opstools/whitelisted_ips ", {
					ip_address : this.ip_address,
					description : this.description
				}).success(function(data, status, headers, config) {
					$scope.whitelistedIps.push(data);
					console.log('success', data);
				}).error(function(data, status, headers, config) {
					alert(data);
					console.log('error', data);
				});
			}

			$scope.updateWhiteListedIps = function() {
				$http.patch(
						apiURL + "/opstools/whitelisted_ips/"
								+ this.selcetedIp.id, {
							ip_address : this.selcetedIp.ip_address,
							description : this.selcetedIp.description,
							deleted : this.selcetedIp.deleted
						}).success(function(data, status, headers, config) {

					$scope.getWhiteListedIps();
					console.log('success', data);
				}).error(function(data, status, headers, config) {
					alert(data);
					console.log('error', data);
				})
			}

			$scope.selcetedIp = null;
			$scope.selectWhitelistedIp = function(row) {
				$scope.selcetedIp = row;

			}

			$scope.getWhiteListedIps();
		} ]);