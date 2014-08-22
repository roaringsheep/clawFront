'use strict';

angular.module('clawFrontApp')
    .controller('GameCtrl', function($scope, $rootScope, $interval, queueFactory, Auth, talkToPi) {

        // $rootScope.$watch("timer", function (newval, oldval){
        //         $scope.notes = newval;
        //     }) 

        $scope.findPortByNum = function(portNum) {
            $scope.ports.forEach(function(obj) {
                if (obj.port === portNum) {
                    return obj
                }
            })
        };

        $scope.goUp = function() {
            // Port 12 on, port 7 off
            console.log('going up...');
            var port12 = findPortByNum(12);
            var port7 = findPortByNum(7);
            port12.state = 'on';
            port7.state = 'off';
            talkToPi.pressButton(port12).success(function(res) {
                console.log('port12!', res);
            });
            talkToPi.pressButton(port7).success(function(res) {
                console.log('port7!', res);
            });
        };

        $scope.goDown = function() {
            //Port 7 on, port 12 off
            console.log('going down...');
            var port12 = findPortByNum(12);
            var port7 = findPortByNum(7);
            port12.state = 'off';
            port7.state = 'on';
            talkToPi.pressButton(port12).success(function(res) {
                console.log('port12!', res);
            });
            talkToPi.pressButton(port7).success(function(res) {
                console.log('port7!', res);
            });
        };

        $scope.goLeft = function() {
            //Port 11 and 13 //FIX THIS
            console.log('going left...');
            var port11 = findPortByNum(11);
            var port13 = findPortByNum(13);
            port11.state = 'off';
            port13.state = 'off';
            talkToPi.pressButton(port11).success(function(res) {
                console.log('port11!', res);
            });
            talkToPi.pressButton(port13).success(function(res) {
                console.log('port13!', res);
            });
        };

        $scope.goRight = function() {
            //port 11 and 13
            console.log('going right...');
            var port11 = findPortByNum(11);
            var port13 = findPortByNum(13);
            port11.state = 'off';
            port13.state = 'off';
            talkToPi.pressButton(port11).success(function(res) {
                console.log('port11!', res);
            });
            talkToPi.pressButton(port13).success(function(res) {
                console.log('port13!', res);
            });
        };

        $scope.clawUp = function() {
            //port 15 on, port 16 off
            console.log('raising claw...');
            var port15 = findPortByNum(15);
            var port16 = findPortByNum(16);
            port15.state = 'on';
            port16.state = 'off';
            talkToPi.pressButton(port15).success(function(res) {
                console.log('port15!', res);
            });
            talkToPi.pressButton(port16).success(function(res) {
                console.log('port16!', res);
            });
        };

        $scope.clawDown = function() {
            // Port 16 on, port 15 off
            console.log('lowering claw...');
            var port15 = findPortByNum(15);
            var port16 = findPortByNum(16);
            port15.state = 'off';
            port16.state = 'on';
            talkToPi.pressButton(port15).success(function(res) {
                console.log('port15!', res);
            });
            talkToPi.pressButton(port16).success(function(res) {
                console.log('port16!', res);
            });
        };

        $scope.ports = [{
            port: 22,
            state: 'off'
        }, {
            port: 18,
            state: 'off'
        }, {
            port: 16,
            state: 'off'
        }, {
            port: 15,
            state: 'off'
        }, {
            port: 13,
            state: 'off'
        }, {
            port: 11,
            state: 'off'
        }, {
            port: 12,
            state: 'off'
        }, {
            port: 7,
            state: 'off'
        }];

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

        //Queue logic
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;
            console.log("newval", newval)
        })
        $scope.getQueue = queueFactory.getQueue();




        $scope.countdown();
    });
