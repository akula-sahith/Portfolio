package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ResearchDisplayDto {

    private String title;
    private String abstractText;
    private String journal;
    private String conference;
    private LocalDate publishDate;
    private List<String> authors;
    private String doi;
    private String url;
    private String thumbnail;
    private List<String> keywords;
}
