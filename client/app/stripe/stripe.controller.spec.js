'use strict';

describe('Controller: StripeCtrl', function () {

  // load the controller's module
  beforeEach(module('clawFrontApp'));

  var StripeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StripeCtrl = $controller('StripeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
