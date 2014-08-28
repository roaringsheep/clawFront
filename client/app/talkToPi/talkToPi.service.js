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

        factory.fixShit = function(string){
            return $http({
                url: '/api/games/fix',
                method: 'POST',
                data: string
            });
        };

        return factory;
    });
