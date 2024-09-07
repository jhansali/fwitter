package com.example.fwitter.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fwitter.exceptions.EmailAlreadyTakenException;
import com.example.fwitter.exceptions.UserDoesNotExistException;
import com.example.fwitter.models.ApplicationUser;
import com.example.fwitter.models.RegistrationObject;
import com.example.fwitter.models.Role;
import com.example.fwitter.repositories.RoleRepository;
import com.example.fwitter.repositories.UserRepository;

@Service
public class UserService {
	
	private final UserRepository userRepo;
	private final RoleRepository roleRepo;
	
	@Autowired
	public UserService(UserRepository userRepo, RoleRepository roleRepo) {
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
	}
	
	public ApplicationUser getUserByUsername(String username) {
		return userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
	}
	
	public ApplicationUser updateUser(ApplicationUser user) {
		try {
			return userRepo.save(user);
		}catch(Exception e) {
			throw new EmailAlreadyTakenException();
		}
	}
	
	public ApplicationUser registerUser(RegistrationObject ro) {
		
		ApplicationUser user = new ApplicationUser();
		
		user.setFirstName(ro.getFirstName());
		user.setLastName(ro.getLastName());
		user.setEmail(ro.getEmail());
		user.setDateOfBirth(ro.getDob());
		
		String name = user.getFirstName()+user.getLastName();
		
		boolean nameTaken = true;
		
		String tempName = "";
		while(nameTaken) {
			tempName = generateUsername(name);
			if(userRepo.findByUsername(tempName).isEmpty()) {
				nameTaken = false;
			}
		}
		
		user.setUsername(tempName);
		
		Set<Role> roles = user.getAuthorities();
		roles.add(roleRepo.findByAuthority("USER").get());
		user.setAuthorities(roles);
		try {
			return userRepo.save(user);
		}catch(Exception e) {
			throw new EmailAlreadyTakenException();
		}
	}
	
	public void generateEmailVerification(String username) {
		
		ApplicationUser user = userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
		
		user.setVerification(generateVerificationNumber());
		
		userRepo.save(user);
		
	}
	
	private String generateUsername(String name) {
		
		long generatedNumber = (long) Math.floor(Math.random()*1_000_000_000);
		return name+generatedNumber;
		
	}
	
	private Long generateVerificationNumber() {
		
		return (long) Math.floor(Math.random()*1_000_000_000);
	}
	
}
