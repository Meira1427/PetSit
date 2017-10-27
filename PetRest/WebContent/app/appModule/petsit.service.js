angular.module('petsitModule')
	.factory('petsitService', function($http, $filter){
		var service = {};
		
		service.index = function(){
			return $http({
				method : 'GET',
				url : 'api/pets'
			})	
		};
		
		service.update = function(pet){
			return $http({
				method : 'PUT',
				url : 'api/pets/' + pet.id,
				headers : {
					'Content-Type' : 'application/json'
				},
				data : pet
			})
		}
		
		service.create = function(pet) {
			console.log(pet);
			return $http({
				method : 'POST',
				url : 'api/pets',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : pet
			})
		}
		
		service.destroy = function(id) {
			return $http({
				method : 'DELETE',
				url : 'api/pets/' + id
			})
		}
		
		service.total = function() {
			console.log("entering in service.total");
			return $http({
				method : 'GET',
				url : 'api/total'
			})
		}
		
		return service;
	});