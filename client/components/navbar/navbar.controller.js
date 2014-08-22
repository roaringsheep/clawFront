'use strict';

angular.module('clawFrontApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, Auth, queueFactory) {
    $scope.menu = [{
      'title': 'theClaw',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    // $rootScope.$watch('queue', function(newval, oldval) {
    //         $scope.queue = newval;
    // })
    
    // $scope.getQueue = queueFactory.getQueue();
    // //Remove player from queue upon logout
    //   $scope.removePlayer = function() {
    //       $scope.tempUser = $scope.getCurrentUser();
    //           for (var i = 0; i < $scope.queue.length; i++){
    //               if ($scope.queue[i].userId == $scope.tempUser._id)
    //                 {$scope.tempUser._id = $scope.queue[i]._id;}
    //             }
    //             console.log ("$scope.queue:", $scope.queue, "tempUser: ", $scope.tempUser._id)
    //         queueFactory.removePlayer($scope.tempUser);     
    //     };

    $scope.logout = function() {
      Auth.logout();
      $scope.removePlayer($scope.getCurrentUser)
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });