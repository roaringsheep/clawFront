'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, queueFactory) {

  //Get current user
  $scope.currentUser = Auth.getCurrentUser();
  console.log("currentUser: ", $scope.currentUser);

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


