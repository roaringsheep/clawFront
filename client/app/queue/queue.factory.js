'use strict';

angular.module('clawFrontApp')
    .factory('queueFactory', function($location, $http, socket, Auth, $rootScope) {


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
                player.inQueue = true;
                $http.post('/api/queues', {
                    username: player.name,
                    userId: player._id,
                    active: true,
                    index: Date.now()
                }).success(function() {
                    $http.post('/api/users/' + player._id, player);
                })
            }
        };

        //remove player from queue
        factory.removeByQueueUserId = function(player) {
            console.log("player in $http.delete request: ", player)
            var there = factory.findQueuePlayer($rootScope.queue, player);
            if (there >= 0) {
                player.inQueue = false;
                return $http.delete('/api/queues/' + player.userId).success(function() {
                    $http.post('/api/users/' + player.userId, player);
                });
            }
        };

        factory.removeByUserId = function(player) {
            console.log("player in $http.delete request: ", player)
            var there = factory.findPlayerInQueue($rootScope.queue, player);
            if (there >= 0) {
                player.inQueue = false;
                return $http.delete('/api/queues/' + player._id).success(function() {
                    $http.post('/api/users/' + player._id, player);
                });
            }
        };

        //search queue by queue.userId
        factory.findQueuePlayer = function(queue, player) {
            var isThere = -1;
            if (queue) {
                for (var i = 0; i < queue.length; i++) {
                    console.log("queue[i].userId", queue[i], "player", player, "i: ", i)
                    if (queue[i].userId == player.userId) {
                        isThere = i;
                        console.log("found it!", isThere);
                    }
                }
            }
            console.log('isThere', isThere);
            return isThere;
        };


        // factory.getQueuePlayer = function(queue, player) {
        //     if (factory.findQueuePlayer(queue, player) >= 0) {
        //         return queue[i];
        //     }

        // }


        //search queue by currentUser._id, stored as queue.userId. returns index
        factory.findPlayerInQueue = function(queue, player) {
            var isThere = -1;
            if (queue) {
                for (var i = 0; i < queue.length; i++) {
                    console.log("queue[i].userId", queue[i], "player", player, "i: ", i)
                    if (queue[i].userId == player._id) {
                        isThere = i;
                        console.log("found it!", isThere);
                    }
                }
            }
            console.log('isThere', isThere);
            return isThere;
        };
        //search queue by currentUser._id, stored as queue.userId. returns object
        factory.getPlayerInQueue = function(queue, player) {
            var player;
            var playerIndex = factory.findPlayerInQueue(queue, player)
            console.log("playerIndex", playerIndex)
            console.log("queuePlayer", queue[playerIndex]);
            if (playerIndex >= 0) {

                player = queue[playerIndex];
            }

            return player;
        }

        //check ETAtoPlay
        factory.ETAtoPlay = function(queue, player) {
            var eta = queue.length;
            // console.log("it's running")
            for (var i = 0; i < queue.length; i++) {
                // console.log("queue[i].userId", queue[i].userId, "player", player._id, "i: ", i)
                if (queue[i].userId == player._id) {
                    eta = i;
                    //console.log("found it!", eta);
                }
            }
            //console.log("eta", eta)
            return eta;
        };

        // check if player is in queue
        factory.updateUser = function(player) {
            return $http.post('/api/users/' + player._id, player);
        }

        factory.userUpdate = function(player) {
            return $http.post('/api/users/' + player._id, player);
        };


        // play game with credits
        factory.playWithCredits = function(queue, player) {
            if (factory.findPlayerInQueue(queue, player) >= 0) {
                factory.removeByUserId(player);
            }
            console.log(player);
            if (player.credits >= 1) {
                player.credits--;
                player.isPlaying = true;
                factory.userUpdate(player).success(function() {
                    console.log("$http.post user: ", player);
                    $location.path('/game')
                });
            }
        };


        factory.persistHeadByCurrentUser = function(player) {
            if (typeof $rootScope.queue[0] != "undefined") {
                var queueHead = $rootScope.queue[0];
                console.log(queueHead);
                if (queueHead.userId == player._id) {
                    console.log('got this far');
                    queueHead.timeAtHead = Date.now();
                    $http.put('/api/queues/' + queueHead.userId, queueHead);
                }

            }

        };

        factory.persistHead = function(player) {
            if (typeof $rootScope.queue[0] != "undefined") {
                var queueHead = $rootScope.queue[0];
                console.log(queueHead);
                if (queueHead.userId == player.userId) {
                    console.log('got this far');
                    queueHead.timeAtHead = Date.now();
                    $http.put('/api/queues/' + queueHead.userId, queueHead);
                }

            }

        };


        // factory.checkHead = function(player) {
        //     if (factory.findPlayerInQueue(queue, player) == 0){
        //         var queueHead = queue[0];
        //         var playDeadline = Date.now() - queueHead.timeAtHead;
        //         if (playDeadline >= 30000) {
        //             alert('timed out of queue');
        //             factory.removeByUserId(player)}
        //     }

        // } 


        return factory;
    });
