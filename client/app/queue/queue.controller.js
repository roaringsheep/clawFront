'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, queueFactory) {

    $rootScope.$watch('queuePaid', function(newval, oldval) {
        $scope.queuePaid = newval;
        console.log("newval", newval)
      })
        $scope.getQueuePaid = queueFactory.getQueuePaid();


    $rootScope.$watch('queueFree', function(newval, oldval) {
        $scope.queueFree = newval;
      })

        $scope.getQueueFree = queueFactory.getQueueFree();

    });


