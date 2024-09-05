package com.example.fwitter.exceptions;

public class EmailAlreadyTakenException extends RuntimeException {
	public EmailAlreadyTakenException() {
		super("This email is already taken");
	}
}
