'use strict';

angular.module('adminApp.elasticSearch', [])
.controller('ElasticSearchCtrl', ['$scope', '$http', '$filter', 'settings', function($scope, $http, $filter, settings) {
  var apiURL = settings.apiURL;
  
  //TODO update when account has gender or profile image url
  $scope.searchProducts = function(pageNo, limit) {
      $scope.products = [];
        $http.post(apiURL + "search/products", {
                                                        product: this.product,
                                                        not_product: this.not_product,
                                                        source: this.source,
                                                        not_source: this.not_source,
                                                        epc_high: this.epc_high,
                                                        epc_low: this.epc_low,
                                                        price_high: this.price_high,
                                                        price_low: this.price_low,
                                                        merchant: this.merchant,
                                                        not_merchant: this.not_merchant,
                                                        country: this.country,
                                                        category: this.category,
                                                        expiration: $filter('date')(this.expiration, "yyyyMMdd0000"),
                                                        listingid:  this.listingid,
                                                        asin:       this.asin,
                                                        upc:        this.upc,
                                                        offerid:    this.offerid,
                                                        page: pageNo,
                                                        per_page: limit
                                                      }
            )
            .success(function(data, status, headers, config) {
                if(data != null && data["hits"] != null && data["hits"]["hits"] != null) {
                    $scope.products = data.hits.hits;
                    if($scope.source == 'shz')
                        $scope.checkOfferExists($scope.products);
                    $scope.totalItems = data["hits"]["total"]
                }
            })
            .error(function(data, status, headers, config) {
                alert(data);
            });
  }
  $scope.formatExpirationDate = function(date) {
      return new Date(date.substr(0, 4), date.substr(4,2), date.substr(6,2))
  }
  $scope.checkOfferExists = function(products) {
      $scope.offers = {}
      for(index = 0; index < products.length; ++index) {
          product = products[index];
          productId = product["_source"]["listingId"];
            $scope.offers[productId] = "Checking...";
            $http.get(apiURL + "products/check_offer_exists/" + productId)
                .success(function(data, status, headers, config) {
                   $scope.offers[data.product_id] = "OK";
                }).error(function(data, status, headers, config) {
                    $scope.offers[data.product_id] = "None";
                });
      }
  }
  // Pagination
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
        $scope.searchProducts($scope.currentPage, $scope.perPage)
    };

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.queryProducts = function() {
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.perPage = 25;
        $scope.searchProducts($scope.currentPage, $scope.perPage);
    }
  $scope.queryProducts();
}]);