package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import entities.Pet;

public class PetTest {
	private static EntityManagerFactory emf = null;
	private static EntityManager em = null;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("Pet");
		em = emf.createEntityManager();
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		em.close();
		emf.close();
	}

	@Test
	public void smoke_test() {
		boolean bool = true;
		assertEquals(true, bool);
	}
	
	@Test
	public void test_pet_entity_mapping() {
		Pet testPet = em.find(Pet.class, 1);
		assertEquals(testPet.getPetName(), "Fido");
	}
	

}
