'use strict';

angular.module('clawFrontApp')
    .controller('LoginCtrl', function($scope, $rootScope, Auth, $location, $window, $timeout, queueFactory) {
        $scope.user = {};
        $scope.errors = {};
        $scope.currentUser = Auth.getCurrentUser();
         $scope.queue = '';

        //Get queue
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;

        })

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
                          $location.path('/profile');
                        },450)
                        
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

        $scope.loginModal = function(form) {
                $scope.login(form);
                //$scope.eta = queueFactory.ETAtoPlay($scope.queue, $scope.currentUser)
                // $scope.addPlayer($scope.currentUser);
            };

        //Add player
        $scope.addPlayer = function(player) {
            return queueFactory.addPlayer(player);
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
