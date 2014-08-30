'use strict';

angular.module('clawFrontApp')
    .controller('QueueCtrl', function($scope, $rootScope, Auth, $timeout, $interval, queueFactory, $location, $http) {

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
            if(player.credits>0){
                return queueFactory.addPlayer(player);
            } else {
                alert('you have no credit');
            }
        };
        //play game with credits
        $scope.playGame = function(player) {
            queueFactory.playWithCredits(player);
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


        // $scope.handleStripe = function(status, response) {
        //   if (response.error) {throw response.error;}
        //   else {
        //     var stripeToken = response.id;
        //     var userId = $scope.currentUser._id;
        //     $http.post('/charge', stripeToken, userId).success(function(){
        //       console.log("$http post token, currentUser", stripeToken, playerId)
        //     });
        //   }
        // }


    // $scope.submitStripe = function() {
    //   console.log('I got here');
    //   // var user = Auth.getCurrentUser();
    //   // user.credits++;
    //   // queueFactory.updateUser(user);
    //   // console.log("token", response);
    //   // if (response.error) {throw response.error;}
    //   //     else {
    //   //       var stripeToken = response.id;
    //   //       var userId = $scope.currentUser._id;
    //   //       $http.post('/charge', stripeToken, userId).success(function(){
    //   //         console.log("$http post token, currentUser", stripeToken, userId)
    //   //       });
    //   //     }
    // }

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
