package com.example.fwitter.exceptions;

public class IncorrectVerificationCodeException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public IncorrectVerificationCodeException() {
		super("The code passed did not match the user vverification code");
	}

}
