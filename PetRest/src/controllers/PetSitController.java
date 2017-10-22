package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
		
	}

}
