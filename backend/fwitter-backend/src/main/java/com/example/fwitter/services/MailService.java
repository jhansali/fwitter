package com.example.fwitter.services;

import com.example.fwitter.exceptions.EmailFailedToSendException;
import com.google.api.client.googleapis.json.GoogleJsonError;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.Properties;

@Service
public class MailService {

    private static final Logger logger = LoggerFactory.getLogger(MailService.class);
    private final Gmail gmail;

    @Autowired
    public MailService(Gmail gmail) {
        this.gmail = gmail;
        if (this.gmail == null) {
            logger.error("Gmail service is null. Check the Gmail bean configuration.");
            throw new IllegalStateException("Gmail service is not properly initialized");
        }
    }

    public void sendEmail(String toAddress, String subject, String content) throws EmailFailedToSendException {
        try {
            Message message = createEmailMessage(toAddress, subject, content);
            message = gmail.users().messages().send("me", message).execute();
            logger.info("Email sent successfully. Message ID: " + message.getId());
        } catch (GoogleJsonResponseException e) {
            GoogleJsonError error = e.getDetails();
            logger.error("Error sending email: " + error.getMessage(), e);
            throw new EmailFailedToSendException("Failed to send email due to Google API error: " + error.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error while sending email", e);
            throw new EmailFailedToSendException("Unexpected error occurred while sending email");
        }
    }

    private Message createEmailMessage(String toAddress, String subject, String content) throws Exception {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);
        MimeMessage email = new MimeMessage(session);

        email.setFrom(new InternetAddress("jhansali@asu.edu"));
        email.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(toAddress));
        email.setSubject(subject);
        email.setText(content);

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        email.writeTo(buffer);
        byte[] rawMessageBytes = buffer.toByteArray();
        String encodedEmail = Base64.getUrlEncoder().encodeToString(rawMessageBytes);

        Message message = new Message();
        message.setRaw(encodedEmail);

        return message;
    }
}