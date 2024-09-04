package com.example.fwitter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fwitter.models.ApplicationUser;
import com.example.fwitter.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	private final UserService userService;
	
	@Autowired
	public AuthenticationController(UserService userService) {
		this.userService = userService;
	}
	
	// go to http::localhost:8000/auth/register
	@PostMapping("/register")
	public ApplicationUser registerUser(@RequestBody ApplicationUser user) {
		return userService.registerUser(user);
	}
	
}
