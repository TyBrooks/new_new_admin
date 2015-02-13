angular.module('adminApp')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/feature1');
  
  $stateProvider
  
    .state('feature1', {
      url: "/feature1",
      templateUrl: 'modules/feature1/feature1.html',
      controller: 'Feature1Ctrl'
    })
    
    .state('feature2', {
      url: "/feature2",
      templateUrl: 'modules/feature2/feature2.html',
      controller: 'Feature2Ctrl'
    })
    
}])
