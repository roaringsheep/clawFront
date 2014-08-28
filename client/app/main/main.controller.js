'use strict';

angular.module('clawFrontApp')
  .controller('MainCtrl', function ($scope, $http, socket, queueFactory) {

    $scope.toggleVideo = function() {
      
      $('#yo').toggleClass('videoUrl2');
      $('#yo').toggleClass('videoUrl');
    }

  });


     