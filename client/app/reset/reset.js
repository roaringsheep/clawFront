'use strict';

angular.module('clawFrontApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reset', {
        url: '/reset/:token',
        templateUrl: 'app/reset/reset.html',
        controller: 'ResetCtrl',
        onEnter: function($http,$state){
        	var url = document.URL;
        	url = url.split('/');
        	var token = url[url.length-1];
        	$http.get('/api/users/reset/'+token).success(function(data){
        		if(data == 'nope'){
        			$state.go('pwrecovery')
        		}
        	})
        }
      });
  });