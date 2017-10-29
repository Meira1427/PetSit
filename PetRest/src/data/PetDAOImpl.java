package data;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Pet;

@Transactional
@Repository
public class PetDAOImpl implements PetDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Pet> getAll() {
		String queryString = "Select p from Pet p";
		return em.createQuery(queryString, Pet.class)
				 .getResultList();
	}

	@Override
	public Pet getById(int id) {
		return em.find(Pet.class, id);
	}

	@Override
	public Pet createNew(String petJSON) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Pet mappedPet = mapper.readValue(petJSON, Pet.class);
			em.persist(mappedPet);
			em.flush();
			return mappedPet;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Pet updatePet(int id, String petJSON) {
		Pet managedPet = em.find(Pet.class, id);
		if(managedPet==null) {
			return managedPet;
		}
		ObjectMapper mapper = new ObjectMapper();
		Pet pet = null;
		try {
			pet = mapper.readValue(petJSON, Pet.class);
			if(pet.getFamilyName() != null && pet.getFamilyName() != "") {
				managedPet.setFamilyName(pet.getFamilyName());
			}
			if(pet.getTasks() != null && pet.getTasks() != "") {
				managedPet.setTasks(pet.getTasks());
			}
			if(pet.getDailyRate() != 0) {
				managedPet.setDailyRate(pet.getDailyRate());
			}
			if(pet.getNumDays() != 0) {
				managedPet.setNumDays(pet.getNumDays());
			}
			if(pet.getPetName() != null && pet.getPetName() != "") {
				managedPet.setPetName(pet.getPetName());
			}
			
		} catch (IOException e) {
		
			e.printStackTrace();
		}
		return pet;
	}

	@Override
	public boolean destroy(int id) {
		Pet managedPet = em.find(Pet.class, id);
		if(managedPet==null) {
			return false;
		}
		em.remove(managedPet);
		return true;
	}

	@Override
	public double getTotalEarnings() {
		List<Pet> pet = getAll();
		double total = 0;
		for (int i = 0; i < pet.size(); i++) {
			double rate = pet.get(i).getDailyRate();
			int numDays = pet.get(i).getNumDays();
			total += rate*numDays;
		}
		return total;
	}
}
