'use strict';

describe('Controller: EmergencyCtrl', function () {

  // load the controller's module
  beforeEach(module('clawFrontApp'));

  var EmergencyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmergencyCtrl = $controller('EmergencyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
