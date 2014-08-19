'use strict';

angular.module('clawFrontApp')
  .factory('queueFactory', function ($http, socket, Auth, $rootScope) {

    var factory = {
        queuePaid: [{"name": "ca$hMoney"}],
        queueFree: [{"name": "flatBroke", isActive: true}]
    };
  
    var queuePaid = factory.queuePaid, 
    queueFree = factory.queueFree;

    factory.getQueuePaid = function() {
        $rootScope.queuePaid = queuePaid;
        console.log("$rootScope.queuePaid: ", $rootScope.queuePaid)
        socket.syncUpdates('queuePaid', $rootScope.queuePaid);
        return $rootScope.queuePaid;
  };

    factory.getQueueFree = function() {
        $rootScope.queueFree = factory.queueFree;
        socket.syncUpdates('queueFree', $rootScope.queueFree)
        return $rootScope.queueFree;
  };

    factory.addPlayer = function(player){
        player.isPaid?
          queuePaid.push(player):
            queueFree.push(player);
    }

    factory.removePlayer = function(player, index){
        player.isPaid?
          queuePaid.splice(index,1):
            queueFree.splice(index,1);
    }

    factory.ETAtoPlay = function(player, index){
      var outcome;
          if (player.isPaid){
            index==0?outcome ="You're next!":outcome = index + "minutes";
        } else {
            outcome = queuePaid.length + index + "minutes";}
      return outcome;
    }   
      console.log("factory:", factory);
    return factory;
  });
