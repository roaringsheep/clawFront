'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, $timeout, $interval,queueFactory) {

        //Get current user
        $scope.currentUser = Auth.getCurrentUser();
        $scope.isLoggedIn = Auth.isLoggedIn();
        console.log("currentUser: ", $scope.currentUser);

        //Get queue
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;

        $interval(function() {
            $scope.queueAlert = queueFactory.queueAlert($scope.currentUser, $scope.queue)
            }, 500000)
        })

        //Add player
        $scope.addFreePlayer = function(player) {
            queueFactory.addFreePlayer(player);


        };
        $scope.addPaidPlayer = function(player) {
            queueFactory.addPaidPlayer(player)

        };
        $scope.increaseEta = function() {
            $scope.eta += "plus one";
        }

        //Remove player
        $scope.removePlayer = function(player) {
            queueFactory.removePlayer(player);

        };
       
        $scope.getQueue = queueFactory.getQueue();
    });