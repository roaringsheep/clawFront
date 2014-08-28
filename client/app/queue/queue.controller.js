'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, $timeout, $interval,queueFactory) {

        //Get current user
        $scope.currentUser = Auth.getCurrentUser();
        $scope.isLoggedIn = Auth.isLoggedIn();
        console.log("currentUser: ", $scope.currentUser);
        $scope.queue = queueFactory.getQueue();


        //Get queue
         $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;
            if (typeof $rootScope.queue == "undefined" || $rootScope.queue.length === 0) {
                // run nothing
            } else {
                $scope.eta = queueFactory.ETAtoPlay(newval, $scope.currentUser);
            }

        })

     

        //Add player
        $scope.addPlayer = function(player) {
            return queueFactory.addPlayer(player);

        };
     

        //Remove player
        $scope.removeByQueueUserId = function(player) {
       
            $scope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            return queueFactory.removeByQueueUserId(player);

        };

        $scope.removeByUserId = function(player) {
         
            $scope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            return queueFactory.removeByUserId(player);
        };

        $scope.timer = {}

        // $scope.ETAtoPlay = function (queue, player) {return queueFactory.ETAtoPlay(queue, player);}
        
    
        $scope.countdown = function() {
                    $interval(function() {
                    if ($scope.timer.countdown > 0){
                        $scope.timer.countdown --;
                        console.log($scope.timer.countdown)
                    if ($scope.timer.countdown == 0) {console.log("You're logged out!")}
                    }}, 1000);
            }
                
//     $scope.getQueue = function () {
//         $http.get('/api/queues').success(function(dbQueue) {
//                 $scope.queue = dbQueue;
//                 socket.syncUpdates('queue', dbQueue);
//                 console.log("dbQueue:", dbQueue);
//     })  
//         return $scope.queue;
// }   



    });