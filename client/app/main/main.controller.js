'use strict';

angular.module('clawFrontApp')

.controller('MainCtrl', function($rootScope, $scope, $http, socket, queueFactory, Auth, $location, $timeout) {

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.directToLogin = function() {
        $('#signup').modal('hide');
        $timeout(function() {
            $('#login').modal('show');
        }, 450)
    }

    $scope.pwRecovery = function() {
        $('#login').modal('hide');
        $timeout(function() {
        	$location.path('/pwrecovery');
        }, 450)
    }

});
