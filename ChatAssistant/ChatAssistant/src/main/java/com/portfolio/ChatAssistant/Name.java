package com.portfolio.ChatAssistant;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.net.URI;

@Component
public class Name {

    @Value("${spring.data.mongodb.uri}")
    private String uri;

    @PostConstruct
    public void printUri() {
        System.out.println("MongoDB URI loaded: " + maskUri(uri));
    }

    private String maskUri(String value) {
        URI parsedUri = URI.create(value.replace("mongodb+srv://", "https://"));
        return "mongodb+srv://" + parsedUri.getHost() + parsedUri.getPath();
    }
}
