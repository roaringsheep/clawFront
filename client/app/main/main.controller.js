'use strict';

angular.module('clawFrontApp')

  .controller('MainCtrl', function ($rootScope,$scope, $http, socket, queueFactory, Auth, $location) {
    
    $scope.isLoggedIn = Auth.isLoggedIn;

  });

