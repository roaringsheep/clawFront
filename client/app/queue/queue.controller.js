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
        $interval(function(){
            var temp = queueFactory.getQueue();
             if (typeof temp != "undefined") {
                $rootScope.queue = queueFactory.getQueue()
            }
        }, 500)

        //Add player
        $scope.addPlayer = function(player) {
            return queueFactory.addPlayer(player);

        };
     

        //Remove player
        $scope.removeByQueueUserId = function(player) {
            queueFactory.removeByQueueUserId(player).success(function(){
                 $rootScope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            });
        };

        $scope.removeByUserId = function(player) {
            queueFactory.removeByUserId(player).success(function(){
                 $rootScope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser);
            });
        };

        $scope.timer = {}
        $scope.test = 0;
        $scope.incrementTest = function() {
            $scope.test++;
        }

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