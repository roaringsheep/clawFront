'use strict';

angular.module('clawFrontApp')
  .controller('QueueCtrl', function ($scope, $rootScope, Auth) {
    $scope.queuePaid = [{}];
    $scope.queueFree = [{}];

    $scope.addPlayer = function(player){
        player.isPaid?
          $scope.queuePaid.push(player):
            $scope.queueFree.push(player);
    }

    $scope.removePlayer = function(index){
        player.isPaid?
          $scope.queuePaid.splice(index,1):
            $scope.queueFree.splice(index,1);
    }

    $scope.ETAtoPlay = function(index){
      var outcome;
          if (player.isPaid){
            index==0?outcome ="You're next!":outcome = index + "minutes";
        } else {
            outcome = $scope.queuePaid.length + index + "minutes";}
      return outcome;
    }
    
  });
