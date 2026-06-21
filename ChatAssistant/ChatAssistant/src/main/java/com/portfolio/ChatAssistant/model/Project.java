package com.portfolio.ChatAssistant.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    private String id;

    // Basic Information
    private String title;
    private String slug;
    private String status;

    // Display Information
    private String elevatorPitch;
    private String shortDescription;
    private String story;

    // Problem Solving
    private String problem;
    private String solution;

    // Personal Contribution
    private String role;
    private String teamSize;

    // Technical Details
    private List<String> techStack;
    private List<String> frameworks;
    private List<String> tools;
    private String architecture;

    // Challenges
    private List<String> challenges;
    private List<String> learnings;

    // Results
    private List<String> achievements;
    private List<String> metrics;

    // AI Explanation Data
    private List<String> keyTalkingPoints;
    private List<ProjectQuestion> commonQuestions;

    // Media
    private List<String> images;
    private String thumbnail;
    private String demoUrl;
    private String githubUrl;
    private String videoUrl;

    // Categorization
    private List<String> domains;
    private List<String> tags;

    // Resume Integration
    private boolean featuredProject;

    // Dates
    private LocalDate startDate;
    private LocalDate endDate;

    // Metadata
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}