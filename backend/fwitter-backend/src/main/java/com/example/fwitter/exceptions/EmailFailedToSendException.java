package com.example.fwitter.exceptions;

public class EmailFailedToSendException extends Exception {
    public EmailFailedToSendException(String message) {
        super(message);
    }

    public EmailFailedToSendException(String message, Throwable cause) {
        super(message, cause);
    }
}