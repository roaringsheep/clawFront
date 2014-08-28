'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, $timeout, $interval,queueFactory) {

        //Get current user
        $scope.currentUser = Auth.getCurrentUser();
        $scope.isLoggedIn = Auth.isLoggedIn();
        console.log("currentUser: ", $scope.currentUser);
        $scope.queue = '';

        //Get queue
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;

        $interval(function() {
            $scope.queueAlert = queueFactory.queueAlert($scope.currentUser, $scope.queue)
            }, 300000)
        })

        //Add player
        $scope.addPlayer = function(player) {
            return queueFactory.addPlayer(player);


        };
     

        //Remove player
        $scope.removeByQueueUserId = function(player) {
            return queueFactory.removeByQueueUserId(player);

        };

        $scope.removeByUserId = function(player) {
            return queueFactory.removeByUserId(player);
        };

        $scope.timer = {}
        $scope.timer.countdown = 10;
        $scope.$watch('queue', function(){
            $scope.minuteToGo($scope.currentUser)

        })
    
        $scope.countdown = function() {
                    $interval(function() {
                    if ($scope.timer.countdown > 0){
                        $scope.timer.countdown --;
                        console.log($scope.timer.countdown)
                    if ($scope.timer.countdown == 0) {console.log("You're logged out!")}
                    }}, 1000);
            }
                
              
        $scope.minuteToGo = function(player) {
             for (var i = 0; i<$scope.queue.length; i++) {
                if (player._id==$scope.queue[i].userId && i == 1) {
                    $scope.countdown();
                }
             }
                
        }

        // $scope.stayInLine = function (player) {
        //     var message = player._id + " is still here";
        //     console.log("stayInLine", message)
        //     $scope.$emit(alert("I'll stay in line"));
        // };

        //ping player at time intervals
       
        $scope.getQueue = queueFactory.getQueue();
    });