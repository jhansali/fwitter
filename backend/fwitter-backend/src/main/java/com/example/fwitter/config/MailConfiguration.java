package com.example.fwitter.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.java6.auth.oauth2.VerificationCodeReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import com.sun.net.httpserver.HttpServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Semaphore;

@Configuration
public class MailConfiguration {

    private static final String APPLICATION_NAME = "Fwitter";
    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Collections.singletonList(GmailScopes.GMAIL_SEND);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    private static class CustomServerReceiver implements VerificationCodeReceiver {
        private final int port;
        private String code;
        private final Semaphore waitUnlessSignaled = new Semaphore(0);
        private HttpServer server;

        public CustomServerReceiver(int port) {
            this.port = port;
        }

        @Override
        public String getRedirectUri() {
            return "http://localhost:" + port + "/oauth2callback";
        }

        @Override
        public String waitForCode() throws IOException {
            server = HttpServer.create(new InetSocketAddress(port), 0);
            server.createContext("/oauth2callback", exchange -> {
                String query = exchange.getRequestURI().getQuery();
                code = query.substring(query.indexOf("code=") + 5);
                exchange.sendResponseHeaders(200, 0);
                exchange.getResponseBody().close();
                waitUnlessSignaled.release();
            });
            server.start();
            try {
                waitUnlessSignaled.acquire();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return code;
        }

        @Override
        public void stop() {
            if (server != null) {
                server.stop(0);
            }
        }
    }

    private Credential getCredential(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        InputStream in = MailConfiguration.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Credential file not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();

        CustomServerReceiver receiver = new CustomServerReceiver(8888);
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    @Bean
    public Gmail getService() {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            return new Gmail.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredential(HTTP_TRANSPORT))
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}