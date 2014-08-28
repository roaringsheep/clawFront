'use strict';

angular.module('clawFrontApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$http', 'socket', 'queueFactory', 'PeerConnect',
    function($rootScope, $scope, $http, socket, queueFactory, PeerConnect) {

      $scope.toggleVideo = function() {

        $('#yo').toggleClass('videoUrl2');
        $('#yo').toggleClass('videoUrl');
      };

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
    }
  ]);
