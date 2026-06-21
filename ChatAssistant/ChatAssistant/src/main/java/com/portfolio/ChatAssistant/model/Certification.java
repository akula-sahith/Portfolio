package com.portfolio.ChatAssistant.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "certifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification {

    @Id
    private String id;

    // Basic Information
    private String title;
    private String slug;

    // Issuer Details
    private String issuer;
    private String description;

    // Dates
    private LocalDate issueDate;
    private LocalDate expiryDate;

    // Credentials
    private String credentialId;
    private String credentialUrl;

    // Media
    private String thumbnail;
    private String badgeUrl;

    // Categorization
    private List<String> skills;
    private List<String> domains;
    private List<String> tags;

    // Metadata
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
