angular.module('petsitModule')
	.component('petsit', {
		templateUrl: 'app/appModule/petsit/petsit.component.html',
		
		controller: function(petsitService, $filter){
			var vm = this;
			
			vm.selected = null;
			vm.newEntry = false;
			vm.totalEarnings = null;
			
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
				vm.totalEarnings = null;
				vm.selected = pet;
				console.log(vm.selected);
			};
			
			vm.displayTable = function() {
				vm.selected = null;
				vm.totalEarnings = null;
				vm.newEntry = false;
			};
			
			vm.updatePet = function(pet){
				petsitService.update(pet)
				.then(function(res){
					getAll();
				})
				.catch(function(error){
					console.log(error);
				});
				vm.selected = null;	
			};
			
			vm.addPet = function(pet) {
				petsitService.create(pet)
				.then(function(res){
					getAll();
				})
				.catch(function(error){
					console.log(error);
				});
			}
			
			vm.deletePet = function(id) {
				petsitService.destroy(id)
				.then(function(res){
					getAll();
				})
				.catch(function(error){
					console.log(error);
				});
				vm.selected = null;	
			}
			
			vm.getTotalEarnings = function() {
				console.log("Entering getTotal()")
				petsitService.total()
				.then(function(res){
					vm.totalEarnings = res.data;
					console.log("Total earnings: " + vm.totalEarnings);
				})
				.catch(function(error){
					console.log(error);
				});
			}
			
		},
			
		controllerAs: 'vm'
	});