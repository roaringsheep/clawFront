'use strict';

angular.module('clawFrontApp')
    .config(function($stateProvider) {

        $stateProvider
            .state('game', {
                url: '#/game',
                templateUrl: 'app/game/game.html',
                controller: 'GameCtrl',
                onEnter: function(Auth, $state, $http) {
                    var user = Auth.getCurrentUser();
                    if (user.role !== 'admin') {
                        $http.get('/api/users/playing').success(function(data) {
                            var usersInGame = data;
                            console.log('usersInGame', data);
                            if (user.role !== 'admin') {
                                console.log('gameArr', usersInGame.length);
                                if (usersInGame.length > 2) {
                                    $state.go('main');
                                } else if (usersInGame.length == 2) {
                                    console.log('user isPlaying', user.isPlaying)
                                    if (user.isPlaying == false) {
                                        $state.go('main');
                                    }
                                } else {
                                    $state.go('main');
                                }
                            }
                        });
                    }
                },
                onExit: function(Auth, $state, $http) {
                    var currUser = Auth.getCurrentUser();
                    currUser.isPlaying = false;
                    $http.post('/api/users/' + currUser._id, currUser);
                }
            });
    });
