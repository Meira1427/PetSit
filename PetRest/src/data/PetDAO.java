package data;

import java.util.List;
import entities.Pet;

public interface PetDAO {
	
	public List<Pet> getAll();
	public Pet getById(int id);
	public Pet createNew(String petJSON);
	public Pet updatePet(int id, Pet pet);
	public boolean destroy(int id);
	public double getTotalEarnings();

}
