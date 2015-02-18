adminApp.config(['$provide', function($provide) {
  $provide.service('settings', ['$window', function($window) {
    this.apiURL = $window.location.origin;
  } ] );
} ] );