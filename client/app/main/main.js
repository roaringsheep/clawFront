'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('navbar', {
        url: '/navbar',
        templateUrl: 'components/navbar/navbar.html',
        controller: 'NavbarCtrl'
      })
       .state('game', {
        url: '/game',
        templateUrl: 'app/game/game.html',
        controller: 'GameCtrl'
      })
        .state('queue', {
        url: '/queue',
        templateUrl: 'app/queue/queue.html',
        controller: 'QueueCtrl'
      })
        .state('waitPage', {
        url: '/queue.waitPage',
        templateUrl: 'app/queue/queue.waitPage.html',
        controller: 'QueueCtrl'
      });
    // $locationProvider
    //   .hashPrefix("#");
  });