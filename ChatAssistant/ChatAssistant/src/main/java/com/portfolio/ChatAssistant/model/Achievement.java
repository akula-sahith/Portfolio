package com.portfolio.ChatAssistant.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "achievements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Achievement {

    @Id
    private String id;

    // Basic Information
    private String title;
    private String slug;
    private String description;

    // Details
    private LocalDate date;
    private String organization;
    private String category;

    // Media
    private String thumbnail;
    private String url;

    // Categorization
    private List<String> tags;

    // Metadata
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
