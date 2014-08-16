'use strict';

describe('Service: queue', function () {

  // load the service's module
  beforeEach(module('clawFrontApp'));

  // instantiate service
  var queue;
  beforeEach(inject(function (_queue_) {
    queue = _queue_;
  }));

  it('should do something', function () {
    expect(!!queue).toBe(true);
  });

});
