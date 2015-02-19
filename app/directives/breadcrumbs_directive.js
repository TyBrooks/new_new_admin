angular.module('adminApp.directives', [])

.directive('breadcrumbs', [function() {
  return {
    restrict: "EA",
    replace: false,
    templateUrl: "directives/templates/breadcrumbs.html",
    controller: ['$scope', '$state', function($scope, $state) {
      // This should probably be configured in a provider somewhere
      var homeSref = "nav.welcome";
      
      $scope.stateList = [];
      $scope.currentStateName = $state.$current.name;
      
      $scope.addState = function(state) {
        $scope.stateList.unshift({ label: state.breadcrumb.label, sref: state.name })
      }
      
      $scope.addRootState = function() {
        $scope.stateList.unshift({label: "Home", sref: homeSref});
      }
      
      $scope.buildStateList = function() {
        $scope.stateList = [];
    
        var currentState = $state.$current;
        
        if ( currentState.breadcrumb && currentState.name != homeSref) {
          $scope.addState( currentState );
          
          while ( currentState.breadcrumb && currentState.breadcrumb.parent ) {
            currentState = $state.get( currentState.breadcrumb.parent )
            $scope.addState( currentState );
          }
        }
        
        $scope.addRootState();
      }
      
      $scope.$on("$stateChangeSuccess", function() {
        $scope.buildStateList();
      })
      
      $scope.buildStateList();
      
    } ]
  }
} ] );