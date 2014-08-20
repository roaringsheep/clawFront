'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, queueFactory) {

  //Get current user
  $scope.currentUser = Auth.getCurrentUser();
  console.log("currentUser: ", $scope.currentUser);
  
  //Get queue
    $rootScope.$watch('queue', function(newval, oldval) {
        $scope.queue = newval;
        console.log("newval", newval)
      })
        $scope.getQueue = queueFactory.getQueue();

    //Add player
    $scope.addFreePlayer = function (player) {queueFactory.addFreePlayer(player)};
    $scope.addPaidPlayer = function (player) {queueFactory.addPaidPlayer(player)}
});





