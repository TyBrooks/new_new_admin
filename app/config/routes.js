angular.module('adminApp')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when()
  
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'modules/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'modules/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
