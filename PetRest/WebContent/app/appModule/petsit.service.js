angular.module('petsitModule')
	.factory('petsitService', function($http, $filter){
		var service = {};
		
		service.index = function(){
			return $http({
				method : 'GET',
				url : 'api/pets'
			})	
		};
		
		
		return service;
	});