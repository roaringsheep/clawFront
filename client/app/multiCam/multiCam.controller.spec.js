'use strict';

describe('Controller: MulticamCtrl', function () {

  // load the controller's module
  beforeEach(module('clawFrontApp'));

  var MulticamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MulticamCtrl = $controller('MulticamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
