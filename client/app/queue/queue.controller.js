'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, $timeout, $interval, queueFactory) {

        //Get current user
        $scope.currentUser = Auth.getCurrentUser();
        $scope.isLoggedIn = Auth.isLoggedIn();
        console.log("currentUser: ", $scope.currentUser);
        $scope.queue = queueFactory.getQueue();

        //Get queue
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;
            if (typeof $rootScope.queue == "undefined") {
                // run nothing
            } else {
                $rootScope.eta = queueFactory.ETAtoPlay(newval, $scope.currentUser);
            }

        })

        $rootScope.$watch('eta', function(newval, oldval) {
            $scope.eta = newval;
            console.log("I updated $rootScope.eta", $rootScope.eta, "$scope.eta: ", $scope.eta)
        })

        //Poll queue
        $interval(function() {
            var temp = queueFactory.getQueue();
            if (typeof temp != "undefined") {
                $rootScope.queue = queueFactory.getQueue()
            }
        }, 10000)

        //Add player
        $scope.addPlayer = function(player) {
            return queueFactory.addPlayer(player);

        };


        //Remove player
        $scope.removeByQueueUserId = function(player) {
            queueFactory.removeByQueueUserId(player).success(function() {
                $rootScope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            });
        };

        $scope.removeByUserId = function(player) {
            queueFactory.removeByUserId(player).success(function() {
                $rootScope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            });
        };

        $scope.timer = {}


        $scope.countdown = function() {
            $interval(function() {
                if ($scope.timer.countdown > 0) {
                    $scope.timer.countdown--;
                    console.log($scope.timer.countdown)
                    if ($scope.timer.countdown == 0) {
                        console.log("You're logged out!")
                    }
                }
            }, 1000);
        }


    });
