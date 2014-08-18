'use strict';

angular.module('clawFrontApp')
  .controller('GameCtrl', function ($scope, $rootScope, $interval, Auth) {
    
  // $rootScope.$watch("timer", function (newval, oldval){
  //         $scope.notes = newval;
  //     }) 

    $scope.portArray = [22,18,16,15,13,11,12,7];
    var reset = 10;
    $scope.game = {
      turns: 3,
      timer: reset,
      isWon: false,
      user: ""
    };

    $scope.countdown = function() {
    if ($scope.game.turns >0) {
      $interval(function() {
        if ($scope.game.timer >0)
        $scope.game.timer--;
        }, 1000);
      }
    };

    $scope.playTurn = function (){
      if ($scope.game.turns >=1)
              $scope.game.turns--;
    }

    $scope.$watch('game.timer', function(){
      if ($scope.game.timer == 0){
        $scope.playTurn();
        $scope.game.timer = reset;
      };
    })

    $scope.moveClaw = function (){
    };

    $scope.dropClaw = function (){
        $scope.playTurn();
    };

    $scope.countdown();
  });
