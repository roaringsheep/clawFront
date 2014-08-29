'use strict';

angular.module('clawFrontApp')
    .config(function($stateProvider) {

        $stateProvider
            .state('game', {
                url: '/game',
                templateUrl: 'app/game/game.html',
                controller: 'GameCtrl'
                //DO NOT DELETE BELOW. THIS DISABLES UNAUTHORIZED USER FROM ENTERING /game
                // onEnter: function(Auth, $state){
                // 	var user = Auth.getCurrentUser();
                // 	console.log('user isPlaying', user.isPlaying)
                // 	if(user.isPlaying !== true){
                // 		$state.go('main');
                // 	}
                // }
            });
    });
