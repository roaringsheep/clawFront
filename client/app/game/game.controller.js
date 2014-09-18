'use strict';

angular.module('clawFrontApp')
    .controller('GameCtrl', function($scope, $rootScope, $interval, queueFactory, Auth, talkToPi, $http, $timeout, $location, PeerConnect, $state) {

            $scope.move = function(status) {
                console.log('moving..');
                talkToPi.pressButton({
                    'move': status
                }).success(function(res) {
                    console.log('move success!', res);
                });
            };

            $scope.startCountDown = function() {
                var currUser = Auth.getCurrentUser();
                if (currUser.timeout == undefined) {
                    console.log('you started game');
                    var kickout = Date.now() + 60000;
                    $scope.currentUser.timeout = kickout;
                    queueFactory.updateUser($scope.currentUser);
                    return kickout;
                } else {
                    console.log('you already started the game');
                    return undefined;
                }
            };

            $scope.kickout = $scope.currentUser.timeout == undefined ? $scope.startCountDown() : $scope.currentUser.timeout;

            $scope.kickUserOut = function() {
                $scope.currentUser.isPlaying = false;
                $scope.currentUser.timeout = undefined;
                queueFactory.updateUser($scope.currentUser).success(function() {
                    $state.go('profile');
                })
            }

            $interval(function() {
                    var currDate = Date.now();
                    if ($scope.kickout < currDate) {
                        alert('timed out!');
                        $scope.kickUserOut();
                    }, 1000);

                $scope.currentUser = Auth.getCurrentUser(); $rootScope.game = true;

                $scope.dropping = false; $scope.clawDrop = function() {
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
                            }, 2600);
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
                            return $timeout(function() {
                                $scope.kickUserOut();
                            }, 2000)
                        })
                })
        };

        //Queue logic
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;
            console.log("newval", newval);
        }); $scope.getQueue = queueFactory.getQueue();


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
            $http.post('/peer/confirmID', {
                id: $scope.my_id,
                secret: mysecret
            }).success(function(res) {
                console.log('Confirmed ID: ', res);
                $scope.isMaster = res.isMaster;

                // Set the large video stream for the master
                if ($scope.isMaster) {
                    $scope.peerURL = $scope.videoURL;
                }

            }).error(function(data, status) {
                console.log('Failed ', data, status);
                $scope.peerError = data.error;
            });

            $rootScope.$on('callFailed', function(event, error) {
                console.log('Call failed: ', error, error.message);
                $scope.peerError = error.message;
                $scope.$apply();
            });

            $rootScope.$on('peerConnectionReceived', function(event, connection) {
                console.log('Peer DataConnection received', connection);
                $scope.peerDataConnection = connection;

                $scope.connected = true;
                $scope.remotePeerId = connection.peer;
                $scope.peerError = null;

                $scope.$apply();
            });

            $rootScope.$on('peerStreamReceived', function(event, objURL) {
                console.log('Peer MediaStream received!', objURL);
                // if this is the master, swap the streams
                if ($scope.isMaster) {
                    $scope.videoURL = objURL;
                } else {
                    $scope.peerURL = objURL;
                }
                // gameBtn.click();
                $scope.$apply();
            });

            $rootScope.$on('callEnded', function(event, callObject) {
                console.log('Peer Disconnected!', callObject);

                $scope.connected = false;
                $scope.waiting = false;
                $scope.otherWaiting = false;

                $http.post('/peer/endCall', {
                    id: $scope.my_id,
                    secret: mysecret
                }).success(function(res) {
                    console.log(res);
                    $scope.remotePeerId = null;

                    $scope.peerError = null;
                }).error(function(data, status) {
                    console.log('Failed ', data, status);

                    $scope.peerError = data.error;
                });

            });

            $scope.endCall = function() {
                peerObject.endCall();
            };

            $scope.callMasterPeer = function() {
                $http.post('/peer/callMaster', {
                    id: $scope.my_id,
                    secret: mysecret
                }).success(function(res) {
                    console.log(res);
                    $scope.remotePeerId = res.peerID;
                    $scope.peerError = null;
                    $scope.callPeer(peerObject);


                }).error(function(data, status) {
                    console.log('Failed ', data, status);
                    $scope.peerError = data.error;
                });
            };

            // $scope.callRequestedPeer = function(remotePeerId) {
            //   $scope.remotePeerId = remotePeerId;
            //   if (remotePeerId) {
            //     $http.post('/peer/callPeer', {
            //       id: $scope.my_id,
            //       callee_id: remotePeerId,
            //       secret: mysecret
            //     }).success(function(res) {
            //       console.log(res);

            //       $scope.remotePeerId = res.peerID;
            //       $scope.peerError = null;
            //       $scope.callPeer(peerObject);

            //     }).error(function(data, status) {
            //       console.log('Failed ', data, status);
            //       $scope.peerError = data.error;
            //     });
            //   }
            // };

        });

});
