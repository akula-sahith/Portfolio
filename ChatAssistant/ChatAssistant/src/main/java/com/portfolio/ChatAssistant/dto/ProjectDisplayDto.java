package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectDisplayDto {

    private String title;

    private String elevatorPitch;

    private String thumbnail;

    private List<String> images;

    private String githubUrl;

    private String demoUrl;

}