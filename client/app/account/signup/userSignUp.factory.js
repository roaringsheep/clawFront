'use strict';

angular.module('clawFrontApp')
  .factory('userSignUpFactory', function ($http, socket, Auth, $rootScope) {

    var factory = {
        paidUser: {"name":""},
        freeUser: {"name":"", isActive: true}
    };
  
    var paidUser= factory.paidUser, 
    freeUser = factory.freeUser;

    factory.addfreeUser = function() {

        $rootScope.freeUser = freeUser;
        console.log("$rootScope.freeUser: ", $rootScope.freeUser)
        socket.syncUpdates('freeUser', $rootScope.freeUser);
        return $rootScope.freeUser;
  };  
      console.log("factory:", factory);
    return factory;
  });

   // $scope.awesomeThings = [];

   //  $http.get('/api/things').success(function(awesomeThings) {
   //    $scope.awesomeThings = awesomeThings;
   //    socket.syncUpdates('thing', $scope.awesomeThings);
   //  });

   //  $scope.addThing = function() {
   //    if($scope.newThing === '') {
   //      return;
   //    }
   //    $http.post('/api/things', { name: $scope.newThing });
   //    $scope.newThing = '';
   //  };

   //  $scope.deleteThing = function(thing) {
   //    $http.delete('/api/things/' + thing._id);
   //  };

   //  $scope.$on('$destroy', function () {
   //    socket.unsyncUpdates('thing');
   //  });