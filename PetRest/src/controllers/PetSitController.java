package controllers;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.PetDAO;
import entities.Pet;

@RestController
public class PetSitController {
	
	@Autowired
	PetDAO petDao;
	
	@RequestMapping(path="ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="pets", method=RequestMethod.GET)
	public List<Pet> index(HttpServletResponse res) {
		List<Pet> list = petDao.getAll();
		if(list.size() > 0) {
			res.setStatus(200);
		}
		else {
			res.setStatus(204);
		}
		return list;
	}
	
	@RequestMapping(path="pets/{id}", method=RequestMethod.GET)
	public Pet show(@PathVariable int id, HttpServletResponse res) {
		Pet pet = petDao.getById(id);
		if(pet != null) {
			res.setStatus(200);
		}
		else {
			res.setStatus(404);
		}
		return pet;
	}
	
	@RequestMapping(path="pets", method=RequestMethod.POST) 
	public Pet create(@RequestBody String petJSON, HttpServletResponse res){
		res.setStatus(201);
		return petDao.createNew(petJSON);
	}
	
	@RequestMapping(path="pets/{id}", method=RequestMethod.PUT) 
	public Pet update(	@PathVariable int id, 
						@RequestBody String petJSON, 
						HttpServletResponse res) {
		Pet pet = petDao.updatePet(id, petJSON);
		if(pet == null) {
			res.setStatus(400);
		}
		else {
			res.setStatus(202);
		}
		return pet;	
	}
	
	@RequestMapping(path="pets/{id}", method=RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return petDao.destroy(id);
	}
	
	//path defined for getting total earnings and routing to partial with total earnings
	@RequestMapping(path="total", method=RequestMethod.GET)
	public double getTotal() {
		return petDao.getTotalEarnings();
	}

}
