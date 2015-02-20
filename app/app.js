'use strict';

// Declare app level module which depends on views, and components
window.adminApp = angular.module('adminApp', [
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'ngSanitize',
  'angularFileUpload',
  'adminApp.nav',
  'adminApp.filters',
  'adminApp.directives',
  'adminApp.elasticSearch',
  'adminApp.customInsert',
  'adminApp.sidDecoder',
  'adminApp.accountSearch'
]);