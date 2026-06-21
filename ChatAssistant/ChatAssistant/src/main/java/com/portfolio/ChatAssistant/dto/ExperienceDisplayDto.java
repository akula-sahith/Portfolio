package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ExperienceDisplayDto {

    private String title;
    private String company;
    private String location;
    private String employmentType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private List<String> responsibilities;
    private List<String> achievements;
    private List<String> techStack;
    private String thumbnail;
    private String companyUrl;
}
