'use strict';

angular.module('clawFrontApp')
  .controller('QueueCtrl', function ($scope, Auth) {
    $scope.queuePaid = [{}];
    $scope.queueFree = [{}];

    $scope.addPlayer = function(player){
        player.isPaid?
          $scope.queuePaid.push(player):
            $scope.queueFree.push(player);
    }

    $scope.removePlayer = function(index){

        $scope.queue.splice(index,1)
    }

    $scope.ETAtoPlay = function(index){
        index==0?return "You're next!":return index + "minutes"
    }
  });
