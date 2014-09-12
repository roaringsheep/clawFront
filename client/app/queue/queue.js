'use strict';

angular.module('clawFrontApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('queue', {
                url: '/queue',
                templateUrl: 'app/queue/queue.html',
                controller: 'QueueCtrl'
            })
            .state('waitPage', {
                url: '/#/profile',
                templateUrl: 'app/queue/queue.waitPage.html',
                controller: 'QueueCtrl'
            });
    });
