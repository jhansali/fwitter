package com.example.fwitter.config;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Configuration;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.GmailScopes;

@Configuration
public class MailConfiguration {

    private static final String APPLICATION_NAME = "Fwitter";
    
    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    
    private static final List<String> SCOPES = Collections.singletonList(GmailScopes.GMAIL_SEND);
    
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    
    private Credential getCredential(final NetHttpTransport HTTP_TRANSPORT) throws IOException{
    	 
    	InputStream in = MailConfiguration.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
    	
    	if(in == null) {
    		throw new FileNotFoundException("Credential file not found");
    	}
    	
    	GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
    	
    	GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
    	        HTTP_TRANSPORT, 
    	        JSON_FACTORY, 
    	        clientSecrets, 
    	        SCOPES
    	    )
    	    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
    	    .setAccessType("offline")
    	    .build();
    	
    	LocalServerReceiver reciever = new LocalServerReceiver.Builder().setPort(8888).build();
    	
    	Credential credential = new AuthorizationCodeInstalledApp(flow, reciever).authorize("user");
    	
    	return credential;
    }
    
}
