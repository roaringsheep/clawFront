'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, $timeout, $interval, queueFactory, $location, $http) {

        //Get current user
        $scope.currentUser = Auth.getCurrentUser();
        $scope.isLoggedIn = Auth.isLoggedIn();
        //console.log("currentUser: ", $scope.currentUser);
        $scope.queue = queueFactory.getQueue();
        // persist time entering head of queue
        $interval(function(){
            $http.get('/api/users/playing').success(function(data){
                if(data.length > 1){
                    $scope.playerInGame = true;
                    $rootScope.playerInGame = true;
                } else if (data.length == 1){
                    $scope.playerInGame = false;
                    $rootScope.playerInGame = false;
                }
                console.log('playerInGame', $scope.playerInGame);
            })
        },1000)

        $scope.persistHeadByCurrentUser = function(player) {
            return queueFactory.persistHeadByCurrentUser(player);
        }

        $scope.persistHead = function(player) {
            return queueFactory.persistHead(player);
        }

        //Get queue
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;
            if (typeof $rootScope.queue == "undefined") {
                // run nothing
            } else {
                $rootScope.eta = queueFactory.ETAtoPlay(newval, $scope.currentUser);
                $rootScope.playerInQueue = queueFactory.getPlayerInQueue(newval, $scope.currentUser);
                $scope.persistHeadByCurrentUser($scope.currentUser);
            }
        })

        $rootScope.$watch('eta', function(newval, oldval) {
            $scope.eta = newval;
            console.log("I updated $rootScope.eta", $rootScope.eta, "$scope.eta: ", $scope.eta)

        })

        $rootScope.$watch('playerInQueue', function(newval, oldval) {
            $scope.playerInQueue = newval;
            console.log("I updated $rootScope.playerInQueue", $rootScope.playerInQueue, "$scope.playerInQueue: ", $scope.playerInQueue)
        })

        //logic for buying credits

        $scope.credits = 1;

        $scope.changeCredit = function(num) {
            $scope.credits = $scope.credits + num;

            if ($scope.credits === 0) {
                $scope.credits = 1;
            }
        }

        $scope.resetCredits = function() {
            return $scope.credits = 1;
        }

        //Poll queue
        $interval(function() {
            var temp = queueFactory.getQueue();
            if (typeof temp != "undefined") {
                $rootScope.queue = queueFactory.getQueue()
            }
        }, 30001)

        //Add player
        $scope.addPlayer = function(player) {
            if (player.credits > 0) {
                alert('awesome. you just joined the queue!');
                queueFactory.addPlayer(player);
                console.log("player", player)
            } else {
                alert('you have no credit');
            }
        };

        //play game with credits
        $scope.playGame = function(queue, player) {
            queueFactory.playWithCredits(queue, player);
        };

        //Remove player
        $scope.removeByQueueUserId = function(player) {
            return queueFactory.removeByQueueUserId(player).success(function() {
                $scope.inQueue = false;
                $rootScope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            });
        };

        $scope.removeByUserId = function(player) {
            return queueFactory.removeByUserId(player).success(function() {
                $scope.inQueue = false;
                alert("You just left the queue");
                $rootScope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            });
        };

        // $scope.countdown = function() {
        //     $interval(function() {
        //         if ($scope.timer.countdown > 0) {
        //             $scope.timer.countdown--;
        //             console.log($scope.timer.countdown)
        //             if ($scope.timer.countdown == 0) {
        //                 console.log("You're logged out!")
        //             }
        //         }
        //     }, 1000);
        // }
    });