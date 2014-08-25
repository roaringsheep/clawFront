'use strict';

angular.module('clawFrontApp')
    .controller('GameCtrl', function($scope, $rootScope, $interval, queueFactory, Auth, talkToPi, $http) {

        // $rootScope.$watch("timer", function (newval, oldval){
        //         $scope.notes = newval;
        //     }) 

        $scope.findPortByNum = function(portNum) {
            for (var i = 0; i < $scope.ports.length; i++) {
                var port = $scope.ports[i];
                if (port.port == portNum) {
                    console.log('foundit!');
                    return port;
                }
            }
            console.log("Couldn't find any! :(");
        };

        $scope.togglePort = function(portNum, state) {
            console.log('portNum', portNum, 'state', state);
            var port = $scope.findPortByNum(portNum);
            console.log('port', port);
            port.state = state;
            talkToPi.pressButton(port).success(function(res) {
                console.log('port', portNum, '!', res);
            });
        }

        $scope.goUp = function() {
            // Port 12 on, port 7 off
            console.log('going up...');
            $scope.togglePort('12', 'on');
            $scope.togglePort('7', 'off');
        };

        $scope.goDown = function() {
            //Port 7 on, port 12 off
            console.log('going down...');
            $scope.togglePort('12', 'off');
            $scope.togglePort('7', 'on');
        };

        $scope.goLeft = function() {
            //Port 11 and 13 //FIX THIS
            console.log('going left...');
            $scope.togglePort('11', 'off');
            $scope.togglePort('13', 'off');
        };

        $scope.goRight = function() {
            //port 11 and 13
            console.log('going right...');
            $scope.togglePort('11', 'off');
            $scope.togglePort('13', 'off');
        };

        $scope.clawUp = function() {
            //port 15 on, port 16 off
            console.log('raising claw...')
            $scope.togglePort('15', 'on');
            $scope.togglePort('16', 'off');
        };

        $scope.clawDown = function() {
            // Port 16 on, port 15 off
            console.log('lowering claw...');
            $scope.togglePort('15', 'off');
            $scope.togglePort('16', 'on');
        };

        $scope.ports = [{
            port: '22',
            state: 'off'
        }, {
            port: '18',
            state: 'off'
        }, {
            port: '16',
            state: 'off'
        }, {
            port: '15',
            state: 'off'
        }, {
            port: '13',
            state: 'off'
        }, {
            port: '11',
            state: 'off'
        }, {
            port: '12',
            state: 'off'
        }, {
            port: '7',
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
            console.log("newval", newval);
        });
        $scope.getQueue = queueFactory.getQueue();




        $scope.countdown();
    });
