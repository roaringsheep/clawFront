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
        factory.addPlayer = function(player) {
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

        // factory.addFreePlayer = function(player) {
        //   var alreadyInQueue = false;
        //   $rootScope.queue.forEach(function(el){
        //       if(el.userId == player._id)
        //           {alreadyInQueue = true;}
        //             return alreadyInQueue;
        //     })
        //       if(!alreadyInQueue){ 
        //       $http.post('/api/queues', {
        //         username: player.name,
        //         userId: player._id,
        //         active: true,
        //         index: "F"+Date.now()
        //       })
        //     }
        //   console.log("$rootScope.queue", $rootScope.queue);
        // }

        //remove player from queue
        factory.removeByQueueUserId = function(player) {
        console.log("player in $http.delete request: ", player)
            return $http.delete('/api/queues/' + player.userId);
           
        }

        factory.removeByUserId = function(player) {
        console.log("player in $http.delete request: ", player)
            return $http.delete('/api/queues/' + player._id);
           
        }

        // factory.removeCurrentUser = function(player) {


        // }
    
        //alert player at queue milestones
        factory.queueAlert = function (player, queue) {
        var alert = i;
        for (var i = 0; i<queue.length; i++) {
               if (queue[i].userId == player._id) {  
                   if (i==10){alert = i}
                      else if (i = 5) {alert = i}
                        else if (i = 1) {alert = i}
            }
          }
          console.log("alert: ", alert)
          return alert;
        }

     
     
        return factory;
    });

    // //check ETAtoPlay
        // factory.ETAtoPlay = function(player, queue) {
        //     var eta = "";
        //     //console.log("queue", queue);
        //         for (var i = 0; i<queue.length; i++) {
        //           if (queue[i].userId == player._id) {
        //             eta= "Hey " + player.name + ", ";
        //               if (i==0){
        //                   eta +="you're next!"}
        //               if (i==1) {
        //                       eta +="1 minute to go!"
        //               }
        //               else eta += i + " minutes to go!";
        //           }
        //         }
        //      console.log("eta", eta);
        //     return eta;
        // }
