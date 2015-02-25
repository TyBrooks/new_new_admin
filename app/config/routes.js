angular.module('adminApp')

.config(['$stateProvider', '$urlRouterProvider', '$provide', function($stateProvider, $urlRouterProvider, $provide) {
  $provide.service('authService', [ '$http', 'settings', function( $http, settings ) {
    this.sendAuthRequest = function() {
      return $http({
        method: 'GET',
        url: settings.apiURL + '/accounts/myself'
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
              function(response) {
                return { data: response.data, success: true};
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
      controller: "NavCtrl",
      breadcrumb: {
        label: "Home",
      }
    })
    
    .state('nav.elasticSearch', {
      url: "/es",
      templateUrl: 'modules/elastic_search/elastic_search.html',
      controller: 'ElasticSearchCtrl',
      breadcrumb: {
        label: "Elastic Search"
      }
    })
    
    .state('nav.customInsert', {
      url: "/custom-insert",
      templateUrl: 'modules/custom_insert/custom_insert.html',
      controller: 'CustomInsertCtrl',
      breadcrumb: {
        label: "Custom Insert"
      }
    })
    
    .state('nav.sidDecoder', {
      url: "/sid-decoder",
      templateUrl: "modules/sid_decoder/sid_decoder.html",
      controller: "SidDecoderCtrl",
      breadcrumb: {
        label: "SID Decoder"
      }
    })
    
    .state('nav.accountSearch', {
      url: "/account-search",
      templateUrl: "modules/user_search/account_search.html",
      controller: "AccountSearchCtrl",
      breadcrumb: {
        label: "Account Search"
      }
    })
    
    .state('nav.accountDetail', {
      url: "/accounts/:id",
      templateUrl: "modules/user_search/account_detail.html",
      controller: "AccountDetailCtrl",
      breadcrumb: {
        label: "Account Details",
        parent: "nav.accountSearch",
        routeParams: function( url ) {
          return {
            id: /\/accounts\/(\d+)/.exec(url)[1]
          }
        }
      }
    })
    
    .state('nav.userDetail', {
      url: "/accounts/:accountId/users/:id",
      templateUrl: "modules/user_search/user_detail.html",
      controller: "UserDetailCtrl",
      breadcrumb: {
        label: "User Details",
        parent: "nav.accountDetail",
        routeParams: function( url ) {
          return {
            id:         /\/users\/(\d+)/.exec(url)[1],
            accountId:  /\/accounts\/(\d+)/.exec(url)[1]
          }
        }
      }
    })
    
    .state('nav.pluginDetail', {
      url: "/accounts/:accountId/users/:userId/plugins/:id",
      templateUrl: "modules/user_search/plugin_detail.html",
      controller: "PluginDetailCtrl",
      breadcrumb: {
        label: "Plugin Detail",
        parent: "nav.userDetail"
      }
    })
    
    .state('nav.whitelistedIps', {
      url: "/whitelistedIps",
      templateUrl: "modules/white_listed_ips/white_listed_ips.html",
      controller: "WhiteListedIpController",
      breadcrumb: {
        label: "White listed Ips"
      }
    })
    
}])
