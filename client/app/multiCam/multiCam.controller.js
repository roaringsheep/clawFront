'use strict';

angular.module('clawFrontApp')
    .controller('MulticamCtrl', function($scope) {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        $scope.videoOption = [];
        $scope.audioOption = [];

        function gotSources(sourceInfos) {
            console.log('got Sources', sourceInfos);
            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                var option = {};
                option.value = sourceInfo.id;
                if (sourceInfo.kind === 'video') {
                    console.log('video!')
                    option.text = sourceInfo.label || 'camera ';
                    $scope.videoOption.push(option)
                } else if (sourceInfo.kind === 'audio') {
                    console.log('audio!');
                    option.text = sourceInfo.label || 'audio';
                    $scope.audioOption.push(option)
                } else {
                    console.log('Some other kind of source: ', sourceInfo);
                }
            }
            console.log('$scope.videoOption', $scope.videoOption);
            console.log('$scope.audioOption', $scope.audioOption);
            populateMedia();

        }

        function populateMedia() {
            if (!!window.stream) {
                videoElement.src = null;
                window.stream.stop();
            }
            console.log('vid options', $scope.videoOption);
            $scope.video0 = $scope.videoOption[0];
            $scope.video1 = $scope.videoOption[1];

            var videoSource0 = $scope.video0.value
            var videoSource1 = $scope.video1.value;
            var constraint0 = {
                audio: {
                    optional: [{
                        sourceId: audioSource
                    }]
                },
                video: {
                    optional: [{
                        sourceId: videoSource0
                    }]
                }
            };

            var constraint1 = {
                audio: {
                    optional: [{
                        sourceId: audioSource
                    }]
                },
                video: {
                    optional: [{
                        sourceId: videoSource1
                    }]
                }
            };
            navigator.getUserMedia(constraint0, successCallback0, errorCallback);
            navigator.getUserMedia(constraint1, successCallback1, errorCallback);

        }

        function successCallback0(stream) {
            window.stream = stream; // make stream available to console
            console.log('stream', stream)
            console.log('url', window.URL.createObjectURL(stream));
            var vidUrl = window.URL.createObjectURL(stream);
            $('#video0')[0].src = vidUrl;
            // $('#videoSource')[0].play();
        }

        function successCallback1(stream) {
            window.stream = stream; // make stream available to console
            console.log('stream', stream)
            console.log('url', window.URL.createObjectURL(stream));
            var vidUrl = window.URL.createObjectURL(stream);
            $('#video1')[0].src = vidUrl;
            // $('#videoSource')[0].play();
        }

        function errorCallback(error) {
            console.log("navigator.getUserMedia error: ", error);
        }

        $scope.start = function() {
            if (typeof MediaStreamTrack === 'undefined') {
                alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
            } else {
                MediaStreamTrack.getSources(gotSources);
            }
        }
        $scope.start();
    });
