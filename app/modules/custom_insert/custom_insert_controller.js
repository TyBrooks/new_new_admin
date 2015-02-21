angular.module('adminApp.customInsert', [])

.controller('CustomInsertCtrl', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {

/*
 * Upload Section
 */
  
  $scope.message = null;
  //Options for type: alert, success, info
  $scope.messageType = null;
  
  $scope.uploader = new FileUploader({
    filters:[{
      name: "CSV-only",
      fn: function(item) {
        var isCSV = !!item.name.match(/^.*\.csv$/);
        return isCSV;
      }
    }],
    removeAfterUpload: true
  });
  
  $scope.params = {
    type: "ae"
  };
  
  $scope.displayMessage = function(msg, time, type) {
    $scope.message = msg;
    $scope.messageType = type;
    $timeout( $scope.clearMessage, time );
  }
  
  $scope.clearMessage = function() {
    $scope.message = null;
    $scope.messageType = null;
  }
  
  $scope.clearFile = function() {
    $scope.uploader.clearQueue();
  }
  
  $scope.setCallbacks = function( uploader ) {
    uploader.onWhenAddingFileFailed = function( filter ) {
      console.log("File adding failed. Failing filter: ", filter)
      $scope.displayMessage("Upload only supports CSV Files!", 4000, "alert");
    }
    
    uploader.onSuccessItem = function() {
      $scope.displayMessage("Successfully Uploaded File. An email summary will be sent to you soon.", 4000, "success");
    }
    
    uploader.onErrorItem = function( item, response, stat, headers ) {
      console.log("File upload error. Debug info dump: item, response, status, headers", item, response, stat, headers)
      $scope.displayMessage("File upload failed!", 6000, "alert");
    }
  }
  
  $scope.setCallbacks($scope.uploader);
  
/*
 * Download section
 */
  
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