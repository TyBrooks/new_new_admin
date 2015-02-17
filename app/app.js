'use strict';

// Declare app level module which depends on views, and components
window.adminApp = angular.module('adminApp', [
  'ui.router',
  'ui.bootstrap',
  'adminApp.nav',
  'adminApp.feature1',
  'adminApp.feature2',
  'adminApp.customInsert',
  'adminApp.sidDecoder'
]);