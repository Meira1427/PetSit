angular.module('petsitModule')
	.component('petsit', {
		templateUrl: 'app/appModule/petsit/petsit.component.html',
		
		controller: function(petsitService, $filter){
			var vm = this;
			
			vm.selected = null;
			
			
			vm.petlist = [];
			
			var getAll = function(){
				petsitService.index()
				.then(function(response){
					vm.petlist = response.data;
					console.log(vm.petlist);
				})
				.catch(function(error){
					console.log(error)
				});
			};
			
			getAll();
			
			vm.displayPet = function(pet){
				vm.selected = pet;
				console.log(vm.selected);
			};
			
			vm.displayTable = function() {
				vm.selected = null;
			}
			
			
			
			
		},
			
		controllerAs: 'vm'
	});