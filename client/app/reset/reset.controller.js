'use strict';

angular.module('clawFrontApp')
    .controller('ResetCtrl', function($scope, $http) {
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
            $scope.firstpw = '';
            $scope.secondpw = '';
        };
        var tokenArr = document.URL.split('/');
        var token = tokenArr[tokenArr.length-1];
        $scope.firstpw = '';
        $scope.secondpw = '';
        $scope.changePw = function() {
        	$scope.clean()
        	if($scope.firstpw !== $scope.secondpw){
        		$('#error-alert').html('Password does not match. Try again.')
        		$scope.error = true;
        	} else{
        		$http.post('/api/users/reset/'+token, {password: $scope.firstpw}).success(function(data, status, headers, config, statusText){
        			console.log('data',data,'status',status,'headers',headers,'config',config,'statusText',statusText)
        			if(data == 'nope') {
        				$scope.clean();
        				$('#error-alert').html('Password reset token is invalid or has expired');
        				$scope.error = true;
        			} else if(data == 'done'){
        				$scope.clean();
        				$('#success-alert').html('Password successfully changed!');
        				$scope.success = true;
        			}
        		})
        	}
        }

    });
