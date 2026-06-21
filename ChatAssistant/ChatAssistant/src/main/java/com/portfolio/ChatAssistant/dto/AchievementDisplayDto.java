package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AchievementDisplayDto {

    private String title;
    private String description;
    private LocalDate date;
    private String organization;
    private String category;
    private String thumbnail;
    private String url;
}
