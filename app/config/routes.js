angular.module('adminApp')

.config(['$stateProvider', '$urlRouterProvider', '$provide', function($stateProvider, $urlRouterProvider, $provide) {
  $provide.service('authService', [ '$http', 'settings', function( $http, settings ) {
    this.sendAuthRequest = function() {
      return $http({
        method: 'GET',
        url: settings.apiURL + 'accounts/myself'
      });
    }
  } ] )
  
  
  $urlRouterProvider.otherwise('/welcome');
  
  $stateProvider
  
    .state('nav', {
      resolve: {
        auth: function(authService) {
          return authService.sendAuthRequest()
            .then(
              function(data) {
                return { data: data, success: true};
              },
              function() {
                return { success: false };
              }
            )
        }
      },
      url: "",
      abstract: true,
      templateUrl: 'modules/main/nav.html',
      controller: 'NavCtrl'
    })
    
    .state('nav.welcome', {
      url: "/welcome",
      templateUrl: "modules/main/nav.welcome.html",
      controller: "NavCtrl"
    })
  
    .state('nav.feature1', {
      url: "/feature1",
      templateUrl: 'modules/feature1/feature1.html',
      controller: 'Feature1Ctrl'
    })
    
    .state('nav.elasticSearch', {
      url: "/es",
      templateUrl: 'modules/elastic_search/elastic_search.html',
      controller: 'ElasticSearchCtrl'
    })
    
    .state('nav.customInsert', {
      url: "/custom-insert",
      templateUrl: 'modules/custom_insert/custom_insert.html',
      controller: 'CustomInsertCtrl'
    })
    
    .state('nav.sidDecoder', {
      url: "/sid-decoder",
      templateUrl: "modules/sid_decoder/sid_decoder.html",
      controller: "SidDecoderCtrl"
    })
    
}])
