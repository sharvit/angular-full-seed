(function() {

  'use strict';

  /* https://github.com/angular/protractor/blob/master/docs/toc.md */

  describe('my app', function() {

    it('should automatically redirect to /login when location hash/fragment is empty', function() {
      browser.get('/');
      expect(browser.getLocationAbsUrl()).toMatch('/login');
    });

    describe('login', function() {
      beforeEach(function() {
        browser.get('/login');
      });

      it('should render login when user navigates to /login', function() {
        expect(element(by.css('.login-state')).isPresent()).toBeTruthy();
      });

      it('should take you to dashboard after entering the right password and clicking "Login"', function() {
        var passwordField = element(by.model('vm.password'));
        var submitButton = element(by.css('.login-state button[type=submit]'));

        passwordField.sendKeys('121212');
        submitButton.click();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard/state1');
      });
    });

    describe('dashboard', function() {

      it('should render dashboard when user navigates to /dashboard', function() {
        expect(element(by.css('.dashboard-state')).isPresent()).toBeTruthy();
      });

      it('should automatically redirect to /dashboard/state1 when location hash/fragment is /dashboard', function() {
        browser.get('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard/state1');
      });


      describe('state1', function() {

        beforeEach(function() {
          browser.get('/dashboard/state1');
        });

        it('should render state1 when user navigates to /dashboard/state1', function() {
          expect(element(by.css('.state1-state')).isPresent()).toBeTruthy();
        });

      });


      describe('state2', function() {

        beforeEach(function() {
          browser.get('/dashboard/state2');
        });

        it('should render state2 when user navigates to /dashboard/state2', function() {
          expect(element(by.css('.state2-state')).isPresent()).toBeTruthy();
        });
      });
    });
  });


})();
