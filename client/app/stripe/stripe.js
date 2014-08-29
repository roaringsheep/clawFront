'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stripe', {
        url: '/stripe',
        templateUrl: 'app/stripe/stripe.html',
        controller: 'StripeCtrl'
      });
  });