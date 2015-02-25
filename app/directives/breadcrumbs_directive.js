angular.module('adminApp.directives', [])

.directive('breadcrumbs', [function() {
  return {
    restrict: "EA",
    replace: false,
    templateUrl: "directives/templates/breadcrumbs.html",
    controller: ['$scope', '$state', '$location', function($scope, $state, $location) {
      // This should probably be configured in a provider somewhere
      var homeSref = "nav.welcome";
      
      $scope.stateList = [];
      $scope.currentStateName = $state.$current.name;
      
      $scope.addState = function(state) {
        $scope.stateList.unshift({ label: state.breadcrumb.label, sref: state.name, routeParams: state.breadcrumb.routeParams })
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
      
      $scope.routeBuilder = function(state){
        var buildParamsString = function( params ) {
          var string = _.reduce( params, function( result, value, key) {
            return result + " " + key + " : " + value + ", ";
          }, "({" );
          
          return string.slice(0, -2) + " })";
        }
        
        if (state.routeParams) {
          var url = $location.path();
          var params = state.routeParams( url );
          var paramsString = buildParamsString( params );
          
          return state.sref + paramsString;
        } else {
          return state.sref;
        }
      };
      
      $scope.$on("$stateChangeSuccess", function() {
        $scope.buildStateList();
      })

      $scope.buildStateList();
      
    } ]
  }
} ] );