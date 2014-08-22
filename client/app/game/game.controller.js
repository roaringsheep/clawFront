'use strict';

angular.module('clawFrontApp')
    .controller('GameCtrl', function($scope, $rootScope, $interval, queueFactory, Auth) {

        // $rootScope.$watch("timer", function (newval, oldval){
        //         $scope.notes = newval;
        //     }) 

        $scope.portArray = [22, 18, 16, 15, 13, 11, 12, 7];

        var timerInit = 5,
            turnsInit = 3,
            localUser = "";

        $scope.game = {
            turns: turnsInit,
            timer: timerInit,
            gameOver: false,
            gameWon: false,
            player: Auth.getCurrentUser() || localUser
        };

        //increment down game timer 
        $scope.countdown = function() {
            if (!$scope.game.gameOver) {
                $interval(function() {
                    if ($scope.game.timer > 0)
                        $scope.game.timer--;
                }, 1000);
            }
        };

        //function to increment down turn counter
        $scope.playTurn = function() {
            $scope.game.turns--;
        }

        //set behavior upon game timer countdown to zero
        $scope.$watch('game.timer', function() {
            console.log("gameover? ", $scope.game.gameOver)
            if ($scope.game.turns > 0) {
                if ($scope.game.timer == 0) {
                    $scope.playTurn();
                    $scope.game.timer = timerInit;
                }
            } else {
                $scope.game.gameOver = true;
                $scope.game.timer = 0;
            }

        })

        $scope.moveClaw = function() {};

        $scope.dropClaw = function() {
            $scope.playTurn();
        };

        //Queue logic
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;
            console.log("newval", newval)
        })
        $scope.getQueue = queueFactory.getQueue();




        $scope.countdown();
    });