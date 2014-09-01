'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pwrecovery', {
        url: '/pwrecovery',
        templateUrl: 'app/pwrecovery/pwrecovery.html',
        controller: 'PwrecoveryCtrl'
      });
  });