(function() {

  'use strict';

  describe('app.states.login module', function() {

    beforeEach(module('app.states.login'));

    describe('login controller', function(){

      var LoginController;

      beforeEach(inject(function($controller) {
        LoginController = $controller('LoginController');
      }));

      it('should be defined', function() {
        expect(LoginController).toBeDefined();
      });

      describe('login method', function(){

        beforeEach(inject(function($state) {
          LoginController.invalidPassword = false;
          LoginController.password = '';
          spyOn($state, 'go').and.callFake(function() {});
        }));

        it('should alert after entering wrong password', function() {
          LoginController.password = 'some wrong password';
          LoginController.login();
          expect(LoginController.invalidPassword).toEqual(true);
        });

        it('should take you to /dashboard/state1 after success login', inject(function($state) {
          LoginController.password = '121212';
          LoginController.login();
          expect($state.go).toHaveBeenCalledWith('dashboard.state1');
        }));

      });

    });
    
  });

})();