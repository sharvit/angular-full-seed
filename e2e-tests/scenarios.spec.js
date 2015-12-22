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

      it('should take you to dashboard after clicking on "Login to Dashboard"', function() {
        element(by.id('login-button')).click();
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard/state1');
      });
    });

    describe('dashboard', function() {

      it('should automatically redirect to /dashboard/state1 when location hash/fragment is /dashboard', function() {
        browser.get('/dashboard');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard/state1');
      });


      describe('state1', function() {

        beforeEach(function() {
          browser.get('/dashboard/state1');
        });


        it('should render state1 when user navigates to /dashboard/state1', function() {
          expect(element.all(by.css('[ui-view] p')).first().getText()).
            toMatch(/partial for state 1/);
        });

      });


      describe('state2', function() {

        beforeEach(function() {
          browser.get('/dashboard/state2');
        });


        it('should render state2 when user navigates to /dashboard/state2', function() {
          expect(element.all(by.css('[ui-view] p')).first().getText()).
            toMatch(/partial for state 2/);
        });

      });

    });

  });


})();
