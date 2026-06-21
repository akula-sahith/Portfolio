package com.portfolio.ChatAssistant.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "researches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Research {

    @Id
    private String id;

    // Basic Information
    private String title;
    private String slug;

    // Content
    private String abstractText;
    private String journal;
    private String conference;

    // Publication
    private LocalDate publishDate;
    private List<String> authors;
    private String doi;
    private String url;

    // Media
    private String thumbnail;

    // Technical Details
    private List<String> techStack;
    private List<String> keywords;

    // Categorization
    private List<String> domains;
    private List<String> tags;

    // Metadata
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
