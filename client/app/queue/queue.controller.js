'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, queueFactory) {

  //Get current user
  $scope.currentUser = Auth.getCurrentUser();
  $scope.isLoggedIn = Auth.isLoggedIn();
  console.log("currentUser: ", $scope.currentUser);
  
  //Get queue
    $rootScope.$watch('queue', function(newval, oldval) {
        $scope.queue = newval;
        //console.log("newval", newval)
        console.log ("$scope.queue watch", $scope.queue);
        //Check ETA to play
        $scope.eta = queueFactory.ETAtoPlay($scope.currentUser, $scope.queue);
      })
        $scope.getQueue = queueFactory.getQueue();

  //Add player
    $scope.addFreePlayer = function(player) {
      queueFactory.addFreePlayer(player)
      
    };
    $scope.addPaidPlayer = function(player) {
      queueFactory.addPaidPlayer(player)
      
    };

  //Remove player
    $scope.removePlayer = function(player){
      queueFactory.removePlayer(player)
    };
    

});





