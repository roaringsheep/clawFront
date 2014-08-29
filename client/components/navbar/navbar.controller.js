'use strict';

angular.module('clawFrontApp')
    .controller('NavbarCtrl', function($scope, $rootScope, $location, Auth, queueFactory) {
        $scope.menu = [{
                'title': 'theClaw',
                'link': '/',
                'data-toggle': "",
                'data-target': ''
            }, {
                'title': 'About',
                'link': '/about',
                'data-toggle': 'modal',
                'data-target': '#about'
            }, {
                'title': 'How to Play',
                'link': '/howto',
                'data-toggle': "",
                'data-target': ''
            }

        ];
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.CurrentUser = Auth.getCurrentUser();
        // $scope.queue = "";
        //Get queue
        $rootScope.$watch('queue', function(newval, oldval) {
            $scope.queue = newval;

        })

        $rootScope.$watch('eta', function(newval, oldval) {
            $scope.eta = newval;
        })

        var userMediaCheck = function() {
            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            if (!navigator.getUserMedia) {
                $rootScope.userMedia = true;
            }
        }

        userMediaCheck();

        // $scope.getQueue = queueFactory.getQueue(); 
        $scope.removeByUserId = function(player) {
            return queueFactory.removeByUserId(player);
        };

        var currentUser = $scope.CurrentUser;

        $scope.logout = function() {
            console.log("scope.removeByUserId: ", $scope.removeByUserId, "$scope.CurrentUser: ", $scope.CurrentUser)
            $scope.removeByUserId($scope.CurrentUser);
            Auth.logout();
            $location.path('/');
        };

        // $scope.logout = function () {
        //   Auth.logout();
        //   $location.path('/');
        // }

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
