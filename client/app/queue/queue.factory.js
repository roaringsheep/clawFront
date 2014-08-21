'use strict';

angular.module('clawFrontApp')
    .factory('queueFactory', function($http, socket, Auth, $rootScope) {


        var factory = {};
        // sort queue by index
        function sortObj(arrofObj, sortingProp) {
            var array = [];
            var newarrofObj = [];
            arrofObj.forEach(function(obj) {
                array.push(obj[sortingProp]);
            });
            array.sort();
            array.forEach(function(elmnt) {
                arrofObj.forEach(function(obj) {
                    if (elmnt === obj[sortingProp]) {
                        newarrofObj.push(obj)
                    }
                });
            });
            return newarrofObj;
        }

        //get sorted queue
        factory.getQueue = function() {
            $rootScope.queue = [];
            $http.get('/api/queues').success(function(queue) {
                $rootScope.queue = sortObj(queue, "index");
                socket.syncUpdates('queue', $rootScope.queue);
                // console.log("queue:", queue);
                return $rootScope.queue;
            })
        };

        //add player to queue
        factory.addPaidPlayer = function(player) {
          var alreadyInQueue = false;
          $rootScope.queue.forEach(function(el){
              if(el.userId == player._id)
                  {alreadyInQueue = true;}
                    return alreadyInQueue;
            })
              if(!alreadyInQueue){ 
              $http.post('/api/queues', {
                username: player.name,
                userId: player._id,
                active: true,
                index: Date.now()
              })
            }
        }

        factory.addFreePlayer = function(player) {
          var alreadyInQueue = false;
          $rootScope.queue.forEach(function(el){
              if(el.userId == player._id)
                  {alreadyInQueue = true;}
                    return alreadyInQueue;
            })
              if(!alreadyInQueue){ 
              $http.post('/api/queues', {
                username: player.name,
                userId: player._id,
                active: true,
                index: "F"+Date.now()
              })
            }
        }

        //remove player from queue
        // factory.removePlayer = function(player) {
        //     $http.delete('/api/queues/' + player.userId);
        // }

        factory.ETAtoPlay = function(player, queue) {
            var eta;
            console.log("1");
            console.log("queue", queue);
                for (var i = 0; i<queue.length; i++) {
                  if (queue[i].userId == player._id) {
                      queue[i]==0?
                      eta ="You're next!":
                      console.log("eta1", eta);
                      eta = i + "  minutes";
                      console.log("eta2", eta);
                  }
                }
             console.log("3");
            return eta;
        }

        console.log("factory:", factory);
        return factory;
    });