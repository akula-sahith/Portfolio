package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ActivityDisplayDto {

    private String title;
    private String description;
    private String organization;
    private String role;
    private LocalDate startDate;
    private LocalDate endDate;
    private String category;
    private String thumbnail;
    private String url;
    private List<String> achievements;
}
