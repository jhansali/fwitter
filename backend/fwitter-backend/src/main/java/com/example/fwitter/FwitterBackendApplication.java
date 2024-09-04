package com.example.fwitter;

import java.util.HashSet;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.fwitter.models.ApplicationUser;
import com.example.fwitter.models.Role;
import com.example.fwitter.repositories.RoleRepository;
import com.example.fwitter.repositories.UserRepository;
import com.example.fwitter.services.UserService;

@SpringBootApplication
public class FwitterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FwitterBackendApplication.class, args);
	}
	
	@Bean
	CommandLineRunner run(RoleRepository roleRepo, UserService userService) {
		return args->{
			roleRepo.save(new Role(1, "USER"));
			ApplicationUser u = new ApplicationUser();
			
			u.setFirstName("jill");
			u.setLastName("hansalia");
			
			userService.registerUser(u);
		};
	}
}
