'use strict';

angular.module('clawFrontApp')
    .factory('talkToPi', function($http) {

        var factory = {};

        factory.pressButton = function(btnData) {
            return $http({
                url: 'http://192.168.1.66:3000/',
                method: "POST",
                data: btnData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        };

        return factory;
    });
