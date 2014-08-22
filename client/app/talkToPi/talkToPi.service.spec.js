'use strict';

describe('Service: talkToPi', function () {

  // load the service's module
  beforeEach(module('clawFrontApp'));

  // instantiate service
  var talkToPi;
  beforeEach(inject(function (_talkToPi_) {
    talkToPi = _talkToPi_;
  }));

  it('should do something', function () {
    expect(!!talkToPi).toBe(true);
  });

});
