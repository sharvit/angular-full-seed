(function() {

  'use strict';

  describe('app.states.dashboard.state1 module', function() {

    beforeEach(module('app.states.dashboard.state1'));

    describe('state1 controller', function(){

      it('should be defined', inject(function($controller) {
        var state1Ctrl = $controller('State1Ctrl');
        expect(state1Ctrl).toBeDefined();
      }));

    });
    
  });

})();