'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/app/main/main.html',
        controller: 'MainCtrl'
      })
        .state('about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: 'MainCtrl'
      })
        .state('howto', {
        url: '/howto',
        templateUrl: 'app/main/howto.html',
        controller: 'MainCtrl'
      })
      .state('navbar', {
        url: '/navbar',
        templateUrl: '/navbar.html',
        controller: 'NavbarCtrl'
      });
      //  .state('game', {
      //   url: '/game',
      //   templateUrl: 'app/game/game.html',
      //   controller: 'GameCtrl'
      // });
      //   .state('queue', {
      //   url: '/queue',
      //   templateUrl: 'app/queue/queue.html',
      //   controller: 'QueueCtrl'
      // })
      //   .state('waitPage', {
      //   url: '/profile',
      //   templateUrl: 'app/queue/queue.waitPage.html',
      //   controller: 'QueueCtrl'
      // });
    $locationProvider
    .html5Mode(true);
    // .hashPrefix('#/');
  });