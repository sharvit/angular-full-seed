(function() {

  'use strict';

  describe('app.states.dashboard.state2 module', function() {

    beforeEach(module('app.states.dashboard.state2'));

    describe('state2 controller', function(){

      it('should be defined', inject(function($controller) {
        var state2Ctrl = $controller('State2Ctrl');
        expect(state2Ctrl).toBeDefined();
      }));

    });
    
  });

})();
