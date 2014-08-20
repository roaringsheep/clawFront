'use strict';

angular.module('clawFrontApp')
    .controller('LoginCtrl', function($scope, Auth, $location, $window, $timeout) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function() {
                        // Logged in, redirect to home
                        $('#login').modal('hide');
                        $timeout(function() {
                          $location.path('/queue.waitPage');
                        },450)
                        
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
            }
        };
        $scope.directToSignup = function() {
            $('#login').modal('hide');
            $timeout(function() {
                $location.path('/signup');
            },450);
        }

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
