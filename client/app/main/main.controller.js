'use strict';

angular.module('clawFrontApp')
  .controller('MainCtrl', function ($rootScope,$scope, $http, socket, queueFactory, Auth, $location) {
    $scope.toggleVideo = function() {
      $('#yo').toggleClass('videoUrl2');
      $('#yo').toggleClass('videoUrl');
    }
    $scope.isLoggedIn = Auth.isLoggedIn;

  });


     