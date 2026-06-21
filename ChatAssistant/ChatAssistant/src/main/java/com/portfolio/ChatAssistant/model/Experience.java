package com.portfolio.ChatAssistant.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    private String id;

    // Basic Information
    private String title;
    private String slug;

    // Company Details
    private String company;
    private String location;
    private String employmentType;

    // Dates
    private LocalDate startDate;
    private LocalDate endDate;

    // Description
    private String description;
    private List<String> responsibilities;
    private List<String> achievements;

    // Technical Details
    private List<String> techStack;
    private List<String> skills;

    // Media
    private String thumbnail;
    private String companyUrl;

    // Categorization
    private List<String> domains;
    private List<String> tags;

    // Metadata
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
