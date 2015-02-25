angular.module('adminApp.customInsert', [])

.controller('CustomInsertCtrl', ['$scope', 'FileUploader', '$timeout', function($scope, FileUploader, $timeout) {

/*
 * Upload Section
 */
  
  $scope.message = null;
  //Options for type: alert, success, info
  $scope.messageType = null;
  
  $scope.fileReader = new FileReader();
  $scope.fileReader.progress = 0;
  $scope.fileReader.uploadReady = false;
  
  $scope.uploader = new FileUploader({
    filters:[{
      name: "CSV-only",
      fn: function(item) {
        var isCSV = !!item.name.match(/^.*\.csv$/);
        return isCSV;
      }
    }],
    removeAfterUpload: true,
    queueLimit: 1
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
    angular.element( document.getElementById('file-input') ).val(null);
    
    $scope.fileReader.progress = 0;
    $scope.fileReader.uploadReady = false;

    $scope.uploader.clearQueue();
  }
  
  $scope.setUploaderCallbacks = function( uploader ) {
    var formatParsedData = function( results ) {
      var byUser = {};

      _.forEach(results, function( cit ) {
        var userId, keyword, urlOrOffer, country, type;
        
        if ( ( userId = cit["UserID"] ) && ( keyword = cit["Keyword"] ) && (urlOrOffer = cit["URL/Offer"] ) && ( country = cit["Country"] ) ) {
          byUser[userId] = byUser[userId] || [];
          
          byUser[userId].push( {
            term: keyword,
            destination: urlOrOffer,
            country: country
          } )
        }
        
      } );
      
      return byUser;
    }
    
    uploader.onWhenAddingFileFailed = function( filter ) {
      console.log("File adding failed. Failing filter: ", filter);
      $scope.displayMessage("Upload only supports CSV Files!", 4000, "alert");
    }
    
    uploader.onAfterAddingFile = function( item ) {
      var file = item._file;
      Papa.parse(file, {
        header: true,
        complete: function( results, file ) {
          var byUser = formatParsedData( results.data );
          console.log("File parssed: ", byUser);
        }
      } );
      // $scope.fileReader.readAsText( file );
    }
    
    uploader.onSuccessItem = function() {
      $scope.displayMessage("Successfully Uploaded File. An email summary will be sent to you soon.", 4000, "success");
    }
    
    uploader.onErrorItem = function( item, response, stat, headers ) {
      console.log("File upload error. Debug info dump: item, response, status, headers", item, response, stat, headers)
      $scope.displayMessage("File upload failed!", 6000, "alert");
      //This needs to be asynchronous, so the uploader knows the file has failed upload
      setTimeout( function() { $scope.clearFile() }, 10)
    }
  }
  
  $scope.setFileReaderCallbacks = function( fileReader ) {
    fileReader.onprogress = function( e, fileName ) {
      $scope.fileReader.progress = e.loaded / e.total * 100;
      $scope.$digest();
    }
    
    fileReader.onloadend = function( e ) {
      $scope.fileReader.uploadReady = true;
      $scope.$digest();
    }
  }
  
  $scope.setUploaderCallbacks($scope.uploader);
  $scope.setFileReaderCallbacks($scope.fileReader);
  
/*
 * Download section
 */
  
  $scope.clearIds = function() {
    $scope.download.ids = [];
  }
  
  $scope.download = {
    ids: []
  };
  
  $scope.filterNonIds = function(id) {
    var id = id.replace(/\s+/g, "");
    var isId = !!id.match(/^\d+$/)
    return ( isId ) ? id : "";
  }
} ] );