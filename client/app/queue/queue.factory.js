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
            $http.post('/api/queues', {
                username: player.name,
                userId: player._id,
                active: true,
                index: Date.now()
            })
        }

        factory.addFreePlayer = function(player) {
            $http.post('/api/queues', {
                username: player.name,
                userId: player._id,
                active: true,
                index: "F" + Date.now()
            })
        }

        //remove player from queue
        factory.removePlayer = function(player) {
            $http.delete('/api/queues/' + player._id);
        }

        factory.ETAtoPlay = function(player) {
            var myEta;
            var queue = $rootScope.queue;
                for (var i = 0; i<queue.length; i++) {
                  if (queue[i].userId == player._id) {
                      queue[i]==0?
                      myEta ="You're next!":
                      myEta = i + "minutes";
                  }
                }
            return myEta;
        }

        console.log("factory:", factory);
        return factory;
    });