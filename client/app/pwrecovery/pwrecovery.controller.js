'use strict';

angular.module('clawFrontApp')
    .controller('PwrecoveryCtrl', function($scope, $rootScope, $http) {
        $rootScope.game = true;
        $scope.email='';
        $scope.error = false;
        $scope.success = false;
        $scope.info = false;
        $scope.warning = false;
        $scope.clean = function() {
            $scope.error = false;
            $('#error-alert').html('');
            $scope.success = false;
            $('#success-alert').html('');
            $scope.info = false;
            $('#info-alert').html('');
            $scope.warning = false;
            $('#warning-alert').html('');
        };
        $scope.emailCheck = function() {
        	$scope.clean();
            $http.post('/api/users/pwrecovery', {
                email: $scope.email
            }).success(function(data, status, headers, config, statusText) {
                console.log('data', data, 'status', status, 'header', headers, 'config', config, 'statusText', statusText);
                if (data == 'nouser') {
                    console.log('nope');
                    $('#error-alert').html("No account with that email address exists.")
                    $scope.error = true;
                } else if (data == 'done') {
                    console.log('done');
                    $('#info-alert').html('An email has been sent to ' + $scope.email + " with further instructions." )
                    $scope.info = true;
                    $scope.email='';
                }
            })
        };
    });
