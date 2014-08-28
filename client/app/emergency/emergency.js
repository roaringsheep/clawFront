'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('emergency', {
        url: '/emergency',
        templateUrl: 'app/emergency/emergency.html',
        controller: 'EmergencyCtrl'
      });
  });