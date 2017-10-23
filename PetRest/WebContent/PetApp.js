$(document).ready(function(){
	console.log('loaded');
	loadPets();
});

var loadPets = function(){
    $.ajax({
        type: 'GET',
        url: 'api/pets',
        dataType: "json"
    })
    .done(function(data, status){
        buildDomTable(data);
    })
    .fail(function(xhr, status, error){
        console.error("Error");
    });
};

var buildDomTable = function(data){
	$('#content').empty();
	//set up table header
 	var table = $('<table>');
   	var head = $('<thead>');
   	var trh = $('<tr>');
   	var th1 = $('<th>');
   	var th2 = $('<th>');
   	var th3 = $('<th>');
   	var th4 = $('<th>');
   	var th5 = $('<th>');
   	var th6 = $('<th>');
   	var th6 = $('<th>');
   	th1.text('Pet Name');
	th2.text('Family Name');
	th3.text('Tasks');
	th4.text('Daily Rate');
	th4.attr('id', 'daily');
	th5.text('Num Days');
	th5.attr('id', 'num');
	th6.text('Edit');
	trh.append(th1);
   	trh.append(th2);
   	trh.append(th3);
   	trh.append(th4);
   	trh.append(th5);
   	trh.append(th6);
   	head.append(trh);
   	table.append(head);
   	var body = $('<tbody>');
   	data.forEach(function(pet){
		var trb = $('<tr>');
	   	var td1 = $('<td>');
	   	var td2 = $('<td>');
	   	var td3 = $('<td>');
	   	var td4 = $('<td>');
	   	var td5 = $('<td>');
	   	var td6 = $('<td>');
		td1.text(pet.petName);
		td2.text(pet.familyName);
		td3.text(pet.tasks);
		td4.text(pet.dailyRate);
		td5.text(pet.numDays);
		td4.attr('id', 'rate');
		td5.attr('id', 'days');
	   	var button = $('<button>');
	   	button.text('Edit');
		button.attr('class', 'tableButton');
	   	button.click(function(){
		   	displayEditPet(pet);
	   	});
	   	td6.append(button);
	   	trb.append(td1);
	   	trb.append(td2);
	   	trb.append(td3);
	   	trb.append(td4);
	   	trb.append(td5);
	   	trb.append(td6);
	   	body.append(trb);
	   });
   	table.append(body);
   	$('#content').append(table);
   	var newButton = $('<button>');
   	newButton.text('New Pet');
   	newButton.click(function(){
	   displayEditPet(null);
   	});
   	$('#content').append(newButton);
	$('#content').append('<br>');
	var calculate = $('<button>');
   	calculate.text('Calculate Earnings');
   	calculate.click(function(){
	   calculateEarnings();
   	});
	$('#content').append(calculate);
};

var displayEditPet = function(pet){
	$('#content').empty();
	$('#messages').empty();
	var form = $('<form>');
	form.attr('name', 'petForm');
	var input1 = $('<input>');
	var input2 = $('<input>');
	var input3 = $('<input>');
	var input4 = $('<input>');
	var input5 = $('<input>');
	input1.attr('type', 'text');
	input2.attr('type', 'text');
	input3.attr('type', 'text');
	input4.attr('type', 'text');
	input5.attr('type', 'text');
	input1.attr('name', 'pet');
	input2.attr('name', 'family');
	input3.attr('name', 'tasks');
	input3.attr('id', 'tasks');
	input4.attr('name', 'rate');
	input5.attr('name', 'days');
	if(pet != null) {
		input1.attr('value', pet.petName);
		input2.attr('value', pet.familyName);
		input3.attr('value', pet.tasks);
		input4.attr('value', pet.dailyRate);
		input5.attr('value', pet.numDays);
	}
	form.append('Pet Name: ');
	form.append(input1);
	form.append('<br>');
	form.append('Family Name: ');
	form.append(input2);
	form.append('<br>');
	form.append('Tasks: ');
	form.append(input3);
	form.append('<br>');
	form.append('Daily Rate: ');
	form.append(input4);
	form.append('<br>');
	form.append('Num Days: ');
	form.append(input5);
	form.append('<br>');
	var submit = $('<input>');
	submit.attr('type', 'submit');
	submit.attr('name', 'submit');
	submit.attr('value', 'Submit');
	submit.click(function(e) {
	   e.preventDefault();
	   if(pet==null) {
		   console.log('moving from form to create')
		   createNewPet();
	   }
	   else {
		   console.log('moving from form to edit')
	   		editPet(pet.id);
		}
   });
   form.append(submit);
   $('#content').append(form);
   if(pet != null) {
	   var deleteButton = $('<input>');
	   deleteButton.attr('type', 'submit');
	   deleteButton.attr('name', 'submit');
	   deleteButton.attr('id','delete');
	   deleteButton.attr('value', 'Delete');
	   deleteButton.click(function(e){
		   e.preventDefault();
		   deletePet(pet.id);
	   });
	   $('#content').append(deleteButton);
	   $('#content').append('<br>');
   }
   var listButton = $('<button>');
   listButton.text('Return to List');
   listButton.attr('id', 'list');
   listButton.click(loadPets);
   $('#content').append(listButton);
};

var editPet = function(id){
	var rate = $(petForm.rate).val();
	var days;
	if(!isNaN($(petForm.days).val())) {
		days = parseInt($(petForm.days).val());
	}
	if(isNaN(rate) || isNaN($(petForm.days).val()) ) {
		console.log('found bad data');
		loadPets();
		var h3 = $('<h3>');
		h3.text("Invalid Input. No Changes Made");
		console.log(h3);
		$('#messages').append(h3);
	}
	else {
		var editPet = {
			petName: $(petForm.pet).val(),
			familyName: $(petForm.family).val(),
			tasks: $(petForm.tasks).val(),
			dailyRate: rate,
			numDays: days
		}
		console.log(editPet);
		$.ajax({
		   type: 'PUT',
		   url: 'api/pets/' + id,
		   dataType: 'json',
		   contentType: 'application/json',
		   data: JSON.stringify(editPet)
	   })
	   .done(function(data, status){
		   loadPets();
	   })
	   .fail(function(xhr, status, error){
		   console.error("Error");
	   });
   }
};

var createNewPet = function(){
	var newPet = {
		petName: $(petForm.pet).val(),
		familyName: $(petForm.family).val(),
		tasks: $(petForm.tasks).val(),
		dailyRate: $(petForm.rate).val(),
		numDays: $(petForm.days).val()
	}
	console.log(newPet);
	$.ajax({
	   type: 'POST',
	   url: 'api/pets',
	   dataType: 'json',
	   contentType: 'application/json',
	   data: JSON.stringify(newPet)
	   })
	   .done(function(data, status){
		   loadPets();
	   })
	   .fail(function(xhr, status, error){
		   console.error("Error");
	   });
};

var deletePet = function(id){
 $.ajax({
	 type: 'DELETE',
	 url: 'api/pets/' + id,
	 })
	 .done(function(data, status){
		 loadPets();
	 })
	 .fail(function(xhr, status, error){
		 console.error("Error");
	 });
};

var calculateEarnings = function(){
	$('#content').empty();
	$('#messages').empty();

	$.ajax({
		type: 'GET',
		url: 'api/total',
		dataType: "json"
	})
	.done(function(data, status){
		var h2 = $('<h2>');
		h2.text('Total Earnings: ' + data);
		$('#content').append(h2);
		var listButton = $('<button>');
	    listButton.text('Return to List');
	    listButton.attr('id', 'list');
	    listButton.click(loadPets);
	    $('#content').append(listButton);
	})
	.fail(function(xhr, status, error){
		console.error("Error");
	});
};
