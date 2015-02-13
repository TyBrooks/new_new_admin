'use strict';

describe('adminApp.view1 module', function() {

  beforeEach(module('myApp.feature1'));

  describe('feature1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('Feature1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});