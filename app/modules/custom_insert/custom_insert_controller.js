angular.module('adminApp.customInsert', [])

.controller('CustomInsertCtrl', ['$scope', 'FileUploader', function($scope, FileUploader) {
  $scope.uploader = new FileUploader();
  
  $scope.params = {
    type: "ae"
  };
} ] );