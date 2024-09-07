package com.example.fwitter.exceptions;

public class UserDoesNotExistException extends RuntimeException{
	
	/**
	 * 
	 */
	private static long serialVersionUID = 1L;
	
	public UserDoesNotExistException() {
		super("The user you are looking for does not exist");
	}
	
}
