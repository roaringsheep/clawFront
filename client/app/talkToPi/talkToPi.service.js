'use strict';

angular.module('clawFrontApp')
    .factory('talkToPi', function($http) {

        var factory = {};

        factory.pressButton = function(moveStatus) {
            return $http({
                url: '/api/games/pi',
                method: "POST",
                data: moveStatus
            });
        };

        return factory;
    });
