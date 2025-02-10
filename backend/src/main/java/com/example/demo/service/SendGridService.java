package com.example.demo.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SendGridService {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${sendgrid.sender.email}")
    private String senderEmail;

    public String sendEmail(String toEmail, String subject, String content) {
        Email from = new Email(senderEmail);
        Email to = new Email(toEmail);
        Content emailContent = new Content("text/plain", content);
        Mail mail = new Mail(from, subject, to, emailContent);

        SendGrid sendGrid = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            return response.getBody(); // For logging or debugging, you may also log status and headers
        } catch (IOException ex) {
            throw new RuntimeException("Error sending email: " + ex.getMessage(), ex);
        }
    }
}
