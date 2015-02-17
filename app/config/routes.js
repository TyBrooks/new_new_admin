angular.module('adminApp')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/welcome');
  
  $stateProvider
  
    .state('nav', {
      url: "/",
      abstract: true,
      templateUrl: 'modules/nav/nav.html',
      controller: 'NavCtrl'
    })
    
    .state('nav.welcome', {
      url: "/welcome",
      templateUrl: "modules/nav/nav.welcome.html",
      controller: "NavCtrl"
    })
  
    .state('nav.feature1', {
      url: "/feature1",
      templateUrl: 'modules/feature1/feature1.html',
      controller: 'Feature1Ctrl'
    })
    
    .state('nav.feature2', {
      url: "/feature2",
      templateUrl: 'modules/feature2/feature2.html',
      controller: 'Feature2Ctrl'
    })
    
}])
