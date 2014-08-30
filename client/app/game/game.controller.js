'use strict';

angular.module('clawFrontApp')
    .controller('GameCtrl', function($scope, $rootScope, $interval, queueFactory, Auth, talkToPi, $http, $timeout, $location, PeerConnect) {

        $scope.move = function(status) {
            console.log('moving..');
            talkToPi.pressButton({
                'move': status
            }).success(function(res) {
                console.log('move success!', res);
            });
        };

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
                    }, 1300)
                })
                .then(function() {
                    $scope.game.player.isPlaying = false;
                    queueFactory.updateUser($scope.game.player).success(function() {
                        window.location = "http://goo.gl/JzbXWe";
                    })
                })
        };

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

        $scope.callPeer = function(peerObject) {
            var remotePeerId = $scope.remotePeerId;
            $scope.peerDataConnection = peerObject.makeCall(remotePeerId);

            $scope.peerDataConnection.on('open', function() {
                // attachReceiptListeners();

                $scope.peerError = null;
                $scope.connected = true;
                // gameBtn.click();

                $scope.$apply();
            });

            $scope.peerDataConnection.on('error', function(err) {
                console.log('Failed to connect to given peerID', err);
            });
        };

        PeerConnect.getPeer().then(function(peerObject) {
            $scope.my_id = peerObject.peer.id;
            $scope.streamReady = true;
            var mysecret = Math.random().toString(36).substring(10);

            $scope.videoURL = peerObject.videoURL;

            // Confirm to the server that my peerID is ready to be connected to
            // $http.post('/confirmID', {
            //   id: $scope.my_id,
            //   secret: mysecret
            // }).success(function(res) {
            //   console.log(res);

            // }).error(function(data, status) {
            //   console.log('Failed ', data, status);

            //   $scope.peerError = data.error;
            // });

            $rootScope.$on('callFailed', function(event, error) {
                console.log('Call failed: ', error, error.message);
                $scope.peerError = error.message;
                $scope.$apply();
            });

            $rootScope.$on('peerConnectionReceived', function(event, connection) {
                console.log('Peer DataConnection received', connection);
                $scope.peerDataConnection = connection;

                // attachReceiptListeners();

                $scope.connected = true;
                $scope.remotePeerId = connection.peer;
                $scope.peerError = null;

                $scope.$apply();
            });

            $rootScope.$on('peerStreamReceived', function(event, objURL) {
                console.log('Peer MediaStream received!', objURL);
                $scope.peerURL = objURL;

                // gameBtn.click();
                $scope.$apply();
            });

            $rootScope.$on('callEnded', function(event, callObject) {
                console.log('Peer Disconnected!', callObject);


                $scope.connected = false;
                $scope.waiting = false;
                $scope.otherWaiting = false;

                // $http.post('/endCall', {
                //   id: $scope.my_id,
                //   secret: mysecret
                // }).success(function(res) {
                //   console.log(res);
                //   $scope.remotePeerId = null;

                //   $scope.peerError = null;
                // }).error(function(data, status) {
                //   console.log('Failed ', data, status);

                //   $scope.peerError = data.error;
                // });

            });

            $scope.endCall = function() {
                peerObject.endCall();
            };

            // $scope.callRandomPeer = function() {
            //   $http.post('/callRandom', {
            //     id: $scope.my_id,
            //     secret: mysecret
            //   }).success(function(res) {
            //     console.log(res);

            //     $scope.remotePeerId = res.peerID;
            //     $scope.peerError = null;
            //     callPeer(peerObject);

            //   }).error(function(data, status) {
            //     console.log('Failed ', data, status);

            //     $scope.peerError = data.error;
            //   });
            // };

            // $scope.callRequestedPeer = function() {
            //   var remotePeerId = $scope.remotePeerId;
            //   if (remotePeerId) {
            //     $http.post('/callPeer', {
            //       id: $scope.my_id,
            //       callee_id: remotePeerId,
            //       secret: mysecret
            //     }).success(function(res) {
            //       console.log(res);

            //       $scope.remotePeerId = res.peerID;
            //       $scope.peerError = null;
            //       callPeer(peerObject);

            //     }).error(function(data, status) {
            //       console.log('Failed ', data, status);
            //       $scope.peerError = data.error;
            //     });
            //   }
            // };

            $scope.callPeerHelper = function(remotePeerId) {
                $scope.remotePeerId = remotePeerId;
                $scope.callPeer(peerObject);

                console.log('Calling ', remotePeerId);
            };

        });

    });
