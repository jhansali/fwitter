package com.example.fwitter.controllers;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fwitter.exceptions.EmailAlreadyTakenException;
import com.example.fwitter.exceptions.EmailFailedToSendException;
import com.example.fwitter.exceptions.IncorrectVerificationCodeException;
import com.example.fwitter.exceptions.UserDoesNotExistException;
import com.example.fwitter.models.ApplicationUser;
import com.example.fwitter.models.RegistrationObject;
import com.example.fwitter.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	private final UserService userService;
	
	@Autowired
	public AuthenticationController(UserService userService) {
		this.userService = userService;
	}
	
	@ExceptionHandler({EmailAlreadyTakenException.class})
	public ResponseEntity<String> handleEmailTaken(){
		return new ResponseEntity<String>("The email you provided is already in use", HttpStatus.CONFLICT);
	}
	
	// go to http::localhost:8000/auth/register
	@PostMapping("/register")
	public ApplicationUser registerUser(@RequestBody RegistrationObject ro) {
	    return userService.registerUser(ro);
	}
	
	@ExceptionHandler({UserDoesNotExistException.class})
	public ResponseEntity<String> handleUserDoesntExist(){
		return new ResponseEntity<String>("The user you are looking for does not exist",HttpStatus.NOT_FOUND);
	}

	@PutMapping("/update/phone")
	public ApplicationUser updatePhoneNumber(@RequestBody LinkedHashMap<String,String> body) {
		
		String username = body.get("username");
		String phone = body.get("phone");
		
		ApplicationUser user = userService.getUserByUsername(username);
		
		user.setPhone(phone);
		
		return userService.updateUser(user);
	}
	
	@ExceptionHandler({EmailFailedToSendException.class})
	public ResponseEntity<String> handledFailedEmail(){
		return new ResponseEntity<String>("Email failed to send, try again in a moment", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping("/email/code")
	public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String,String> body){
		
		userService.generateEmailVerification(body.get("username"));
		
		return new ResponseEntity<String>("Verification code generated, email sent", HttpStatus.OK);
	}
	
	@ExceptionHandler({IncorrectVerificationCodeException.class})
	public ResponseEntity<String> incorrectCodeHandler(){
		return new ResponseEntity<String>("The code provided does not match the users code", HttpStatus.CONFLICT);
	}
	
	@PostMapping("/email/verify")
	public ApplicationUser verifyEmail(@RequestBody LinkedHashMap<String,String> body) {
		
		Long code = Long.parseLong(body.get("code"));
		
		String username = body.get("username");
		
		return userService.verifyEmail(username,code);	
	}
	
	@PutMapping("/update/password")
	public ApplicationUser updatePassword(@RequestBody LinkedHashMap<String,String> body) {
		
		String username = body.get("username");
		String password = body.get("password");
		
		return userService.setPassword(username,password);
		
	}
	
}
