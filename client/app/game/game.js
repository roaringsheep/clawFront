'use strict';

angular.module('clawFrontApp')
    .config(function($stateProvider) {

        $stateProvider
            .state('game', {
                url: '/game',
                templateUrl: 'app/game/game.html',
                controller: 'GameCtrl',
                onEnter: function(Auth, $state, $http) {
                    $http.get('/api/users/playing').success(function(data) {
                        var usersInGame = data;
                        console.log('gameArr', usersInGame.length);
                        if (usersInGame.length > 1) {
                            $state.go('main')
                        } else if (usersInGame.length == 1) {
                            var user = Auth.getCurrentUser();
                            console.log('user isPlaying', user.isPlaying)
                            if (user.isPlaying == false) {
                                $state.go('main');
                            }
                        } else {
                            $state.go('main');
                        }
                    })
                },
                onExit: function(Auth, $state, $http){
                    var currUser = Auth.getCurrentUser();
                    currUser.isPlaying = false;
                    $http.post('/api/users/'+currUser._id, currUser);
                }
            });
    });
