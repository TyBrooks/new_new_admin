angular.module('adminApp.accountSearch')

.controller('AccountDetailCtrl',
  ['$scope', '$http', '$stateParams', 'settings',
  function($scope, $http, $stateParams, settings) {
    var apiURL = settings.apiURL;
    
    //TODO update when account has gender or profile image url
      $scope.getRevShares = function(userIds) {
          $http.post(apiURL + "/accounts/get_rev_shares", angular.toJson(userIds))
              .success(function(data, status, headers, config) {
                  $scope.revShares = data;
              })
              .error(function(data, status, headers, config) {
                  alert(data);
              });
      }
    $scope.getInstallableUsers = function(accountId, pageNo, perPage) {
          $http.get(apiURL + "/accounts/get_installable_users/" + accountId + "?page=" + pageNo + "&per_page=" + perPage)
              .success(function(data, status, headers, config) {
                  $scope.users = data;
                  var userIds = [];
                  for(var i = 0; i < data.length; i++) {
                      userIds.push(data[i].id);
                  }
                  $scope.totalItems = parseInt(headers('x-totalitems'));
                  $scope.getRevShares(userIds);
              })
              .error(function(data, status, headers, config) {
                  alert(data);
              });
    }


    $scope.getAccount = function(accountId) {
          $http.get(apiURL + "/accounts/" + accountId)
              .success(function(data, status, headers, config) {
                  $scope.account = data;
                  $scope.getInstallableUsers(accountId, $scope.currentPage, $scope.perPage);

              })
              .error(function(data, status, headers, config) {
                  alert(data);
              });
    }

      $scope.updateAccountTrusted = function(value) {
          $scope.updateAccount({"id": $scope.account.id, "trusted": value});
      }
      $scope.updateAccountNewDashboard = function(value) {
          $scope.updateAccount({"id": $scope.account.id, "newDashboard": value});
      }
      $scope.updateAccountPaymentType = function(value) {
          $scope.updateAccount({"id": $scope.account.id, "paymentType": value});
      }
      $scope.updateAccountPartnerTesting = function(value) {
          $scope.updateAccount({"id": $scope.account.id, "partnerTesting": value});
      }

    $scope.updateAccount = function(data) {
        $scope.error = {"type" : "warning", "flag": "waring", "msg": "Updating account. Please waiting ..."}
          $http.post(apiURL + "/accounts/update_account", angular.toJson(data))
              .success(function(data, status, headers, config) {
                  $scope.error = {"type" : "success", "flag": "check", "msg": "Updated successfully!"}
              })
              .error(function(data, status, headers, config) {
                  $scope.error = {"type" : "error", "flag": "times", "msg": data}
              });
    }

    $scope.getPaymentTypes = function() {
          $http.get(apiURL + "/payments/get_types")
              .success(function(data, status, headers, config) {
                  $scope.paymentTypes = data;
              });
    }
    $scope.accountId = $stateParams.id;
    // Pagination
      $scope.pageChanged = function() {
          console.log('Page changed to: ' + $scope.currentPage);
          $scope.getInstallableUsers($scope.accountId, $scope.currentPage, $scope.perPage)
      };

      $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
      };
      $scope.totalItems = 0;
      $scope.currentPage = 1;
      $scope.maxSize = 5;
      $scope.perPage = 25;
      // End of Pagination

    $scope.getAccount($scope.accountId);
    $scope.getPaymentTypes();
}])