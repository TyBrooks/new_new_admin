adminApp.config(['$provide', function($provide) {
  $provide.service('settings', function() {
    this.apiURL = 'https://admin.viglink.com/'
  })
} ] );