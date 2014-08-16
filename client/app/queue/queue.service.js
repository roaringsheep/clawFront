'use strict';

angular.module('clawFrontApp')
  .factory('queue', function ($rootScope, socket) {

    var factory = {};

    factory.getQueue = function() {
      $rootScope.queue = [];
        socket.syncUpdates('queue', $rootScope.queue);
        return $rootScope.queue;
    };
      // console.log("factory:", factory);
    return factory;
  });
