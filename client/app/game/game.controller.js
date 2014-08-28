'use strict';

angular.module('clawFrontApp')
    .controller('GameCtrl', function($scope, $rootScope, $interval, queueFactory, Auth, talkToPi, $http, $timeout, $location) {


        $scope.move = function(status) {
            console.log('moving..');
            talkToPi.pressButton({
                'move': status
            }).success(function(res) {
                console.log('move success!', res);
            });
        };

        $scope.fixShit = function(){
            var string = "15,off,16,off";
            talkToPi.fixShit({
                'move': string
            })
        }

        $scope.dropping = false;
        $scope.clawDrop = function() {
            //lower, loclear raise, raclear left, lclear forw, fclear lower, loclear raise, raclear  
            $scope.dropping = true;
            console.log('lowering...')
            $scope.move('lower');
            $timeout(function() {
                $scope.move('loclear,raise');
            }, 2400)
                .then(function() {
                    return $timeout(function() {
                        $scope.move('raclear,left');
                    }, 2300);
                })
                .then(function() {
                    return $timeout(function() {
                        $scope.move('lclear,forw');
                    }, 5000);
                })
                .then(function() {
                    return $timeout(function() {
                        $scope.move('fclear,lower');
                    }, 3500);
                })
                .then(function() {
                    return $timeout(function() {
                        $scope.move('loclear,raise');
                    }, 1000);
                })
                .then(function() {
                    return $timeout(function() {
                        $scope.move('raclear');
                        $scope.dropping = false;
                        window.location = "http://goo.gl/JzbXWe";
                    }, 1300);
                })
        };

        // $rootScope.$watch("timer", function (newval, oldval){
        //         $scope.notes = newval;
        //     }) 
        // $scope.findPortByNum = function(portNum) {
        //     for (var i = 0; i < $scope.ports.length; i++) {
        //         var port = $scope.ports[i];
        //         if (port.num == portNum) {
        //             return port;
        //         }
        //     }
        //     console.log("Couldn't find any! :(");
        // };

        // $scope.togglePort = function(portArr, stateArr) {
        //     var ports = "";
        //     for (var i = 0; i < portArr.length; i++) {
        //         var port = $scope.findPortByNum(portArr[i]);
        //         port.state = stateArr[i];
        //         if (i == portArr.length - 1) {
        //             ports += port.port + ',' + stateArr[i];
        //         } else {
        //             ports += port.port + "," + stateArr[i] + ',';
        //         }
        //     }
        //     talkToPi.pressButton({
        //         'ports': ports
        //     }).success(function(res) {
        //         console.log('port', ports, '!', res);
        //     });
        // }

        // $scope.goFront = function() {
        //     // Port 12 on, port 7 off
        //     var btn = $('#front');
        //     btn.toggleClass('btn-primary');
        //     btn.toggleClass('on');
        //     if (btn.hasClass('on')) {
        //         console.log('going to me...');
        //         $scope.togglePort(['2', '1', '7'], ['on', 'off', 'off']);
        //     } else {
        //         console.log('stopping...')
        //         $scope.togglePort(['2'], ['off']);
        //     }
        // };

        // $scope.goBack = function() {
        //     //Port 7 on, port 12 off
        //     var btn = $('#back');
        //     btn.toggleClass('on');
        //     btn.toggleClass('btn-primary');
        //     if (btn.hasClass('on')) {
        //         console.log('going back...');
        //         $scope.togglePort(['2', '1', '7'], ['off', 'on', 'on']);
        //     } else {
        //         console.log('stopping...')
        //         $scope.togglePort(['1', '7'], ['off', 'off']);
        //     }
        // };

        // $scope.goLeft = function() {
        //     var btn = $('#left');
        //     btn.toggleClass('on');
        //     btn.toggleClass('btn-primary');
        //     if (btn.hasClass('on')) {
        //         console.log('going left...');
        //         $scope.togglePort(['3', '4', '8'], ['off', 'on', 'off']);
        //     } else {
        //         console.log('stopping...');
        //         $scope.togglePort(['4'], ['off']);
        //     }
        // };

        // $scope.goRight = function() {
        //     var btn = $('#right');
        //     btn.toggleClass('on');
        //     btn.toggleClass('btn-primary');
        //     if (btn.hasClass('on')) {
        //         console.log('going right...');
        //         $scope.togglePort(['3', '4', '8'], ['on', 'off', 'on']);
        //     } else {
        //         console.log('stopping...')
        //         $scope.togglePort(['3','8'], ['off','off']);
        //     }
        // };

        // $scope.raise = function() {
        //     var btn = $('#raise');
        //     btn.toggleClass('on');
        //     btn.toggleClass('btn-primary');
        //     if (btn.hasClass('on')) {
        //         console.log('raising claw...')
        //         $scope.togglePort(['5', '6'], ['off', 'on']);
        //     } else {
        //         console.log('stopping...')
        //         $scope.togglePort(['6'], ['off']);
        //     }
        // };

        // $scope.lower = function() {
        //     var btn = $('#lower');
        //     btn.toggleClass('on');
        //     btn.toggleClass('btn-primary');
        //     if (btn.hasClass('on')) {
        //         console.log('lowering claw...');
        //         $scope.togglePort(['5', '6'], ['on', 'off']);
        //     } else {
        //         console.log('stopping...');
        //         $scope.togglePort(['5'], ['off']);
        //     }
        // };

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
