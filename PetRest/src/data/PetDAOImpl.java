package data;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Pet;

@Transactional
@Repository
public class PetDAOImpl implements PetDAO {

	@Override
	public List<Pet> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pet getById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pet createNew(String petJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pet updatePet(int id, Pet pet) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean destroy(int id) {
		// TODO Auto-generated method stub
		return false;
	}
	

}
