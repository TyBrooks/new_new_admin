angular.module('adminApp.directives', [])

.directive('breadcrumbs', [function() {
  return {
    restrict: "EA",
    replace: false,
    templateUrl: "directives/templates/breadcrumbs.html",
    controller: ['$scope', '$state', function($scope, $state) {
      var homeSref = "nav.welcome";
      
      $scope.stateList = [];
      
      $scope.addState = function(state) {
        $scope.stateList.push({ label: state.breadcrumb.label, sref: state.name })
      }
      
      $scope.buildStateList = function() {
        $scope.stateList = [{label: "Home", sref: homeSref}];
    
        var currentState = $state.$current;
        
        if ( currentState.breadcrumb && currentState.name != homeSref) {
          $scope.addState( currentState );
        
          while ( currentState.breadcrumb && currentState.breadcrumb.parent ) {
            currentState = $state.get( currentState.breadcrumb.parent )
            $scope.addState( currentState );
          }
        }
      }
      
      $scope.$on("$stateChangeSuccess", function() {
        $scope.buildStateList();
      })
      
      $scope.buildStateList();
      
    } ]
  }
} ] );