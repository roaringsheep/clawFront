'use strict';

angular.module('clawFrontApp')
    .controller('NavbarCtrl', function($scope, $rootScope, $location, $timeout, Auth, queueFactory, $http) {
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
        $scope.currentUser = Auth.getCurrentUser();
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

        var currentUser = $scope.currentUser;

        $scope.logout = function() {
            console.log("$scope.currentUserPre: ", $scope.currentUser)
            $scope.currentUser.isPlaying = false
            var id = $scope.currentUser._id;
            $http.post('/api/users/'+id, $scope.currentUser);
            $scope.removeByUserId($scope.currentUser);
             console.log("$scope.currentUserPost: ", $scope.currentUser)
            $timeout(function(){
                Auth.logout()}, 500
            );
            $location.path('/');
            
            
            
        };

        $scope.isLoggedIn = Auth.isLoggedIn;

        // $scope.logout = function () {
        //   Auth.logout();
        //   $location.path('/');
        // }

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
