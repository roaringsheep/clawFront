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
      $rootScope.QueuePaid = [];
      $http.get('/api/queues').success(function(queue) {
        $rootScope.queue = queue;
        socket.syncUpdates('queue', $rootScope.queue);
        // console.log("queue:", queue);
        return $rootScope.queuePaid;
    })
  };

     factory.getQueueFree = function() {
      $rootScope.QueueFree = [];
      $http.get('/api/queues').success(function(queue) {
        $rootScope.queue = queue;
        socket.syncUpdates('queue', $rootScope.queue);
        // console.log("queue:", queue);
        return $rootScope.queueFree;
    })
  };

    factory.addPlayer = function(player){
        player.isPaid? 
          queuePaid.push(player._id):
            queueFree.push(player._id);
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


  
