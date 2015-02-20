angular.module('adminApp.customInsert', [])

.controller('CustomInsertCtrl', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {
  
  $scope.message = null;
  //Options for type: alert, success, info
  $scope.messageType = null;
  
  $scope.displayMessage = function(msg, time, type) {
    $scope.message = msg;
    $scope.messageType = type;
    $timeout( $scope.clearMessage, time );
  }
  
  $scope.clearMessage = function() {
    $scope.message = null;
    $scope.messageType = null;
  }
  
  $scope.uploader = new FileUploader({
    filters:[{
      name: "CSV-only",
      fn: function(item) {
        var isCSV = !!item.name.match(/^.*\.csv$/);
        if ( !isCSV ) {
          $scope.displayMessage("Upload only supports CSV Files!", 4000, "alert");
        }
        return isCSV;
      }
    }],
    removeAfterUpload: true
  });
  
  $scope.params = {
    type: "ae"
  };
  
  $scope.clearFile = function() {
    $scope.uploader.clearQueue();
  }
  
  $scope.clearIds = function() {
    $scope.download.ids = [];
  }
  
  $scope.download = {
    ids: []
  };
  
  $scope.taggedId = function(id) {
    return id;
  }
} ] );