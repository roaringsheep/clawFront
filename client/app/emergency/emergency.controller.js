'use strict';

angular.module('clawFrontApp')
    .controller('EmergencyCtrl', function($scope, talkToPi) {
        $scope.fixShit = function(string) {
            talkToPi.fixShit({
                'move': string
            })
        }

    });
