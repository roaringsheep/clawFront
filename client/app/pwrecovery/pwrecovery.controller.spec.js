'use strict';

describe('Controller: PwrecoveryCtrl', function () {

  // load the controller's module
  beforeEach(module('clawFrontApp'));

  var PwrecoveryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PwrecoveryCtrl = $controller('PwrecoveryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
