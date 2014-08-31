'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('multiCam', {
        url: '/multiCam',
        templateUrl: 'app/multiCam/multiCam.html',
        controller: 'MulticamCtrl'
      });
  });