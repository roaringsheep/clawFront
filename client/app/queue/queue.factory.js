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
            var queue = [];

            $http.get('/api/queues').success(function(dbQueue) {
                $rootScope.queue = sortObj(dbQueue, "index");
                socket.syncUpdates('queue', $rootScope.queue);
                return $rootScope.queue;
            })

        };

        //add player to queue
        factory.addPlayer = function(player) {
            var alreadyInQueue = false;
            $rootScope.queue.forEach(function(el) {
                if (el.userId == player._id) {
                    alreadyInQueue = true;
                }
                return alreadyInQueue;
            })
            if (!alreadyInQueue && player.credits >= 1) {
                $http.post('/api/queues', {
                    username: player.name,
                    userId: player._id,
                    active: true,
                    index: Date.now()
                })
            }
        }



        //remove player from queue
        factory.removeByQueueUserId = function(player) {
            console.log("player in $http.delete request: ", player)
            var there = findPlayerInQueue($rootScope.queue, player);
            if (there > 0) {
                return $http.delete('/api/queues/' + player.userId);
            } else {
                return undefined;
            }
        };

        factory.removeByUserId = function(player) {
            console.log("player in $http.delete request: ", player)
            var there = findPlayerInQueue($rootScope.queue, player);
            if (there > 0) {
                return $http.delete('/api/queues/' + player._id);
            } else {
                return undefined;
            }
        };

        var findPlayerInQueue = function(queue, player) {
            var isThere = -1;
            if (queue) {
                for (var i = 0; i < queue.length; i++) {
                    console.log("queue[i].userId", queue[i].userId, "player", player._id, "i: ", i)
                    if (queue[i].userId == player._id) {
                        isThere = i;
                        console.log("found it!", isThere);
                    }
                }
            }
            console.log('isThere', isThere);
            return isThere;
        };

        //check ETAtoPlay
        factory.ETAtoPlay = function(queue, player) {
            var eta = queue.length;
            console.log("it's running")
            for (var i = 0; i < queue.length; i++) {
                console.log("queue[i].userId", queue[i].userId, "player", player._id, "i: ", i)
                if (queue[i].userId == player._id) {
                    eta = i;
                    console.log("found it!", eta);
                }
            }
            console.log("eta", eta)
            return eta;
        };

        // check if player is in queue

        // play game with credits

        factory.playWithCredits = function(player) {
            if (player.credits >= 1) player.credits--;
            $http.put('/api/users/' + user._id, user).success(function() {
                console.log("$http.put user: ", user);
            });
        }


        return factory;
    });
