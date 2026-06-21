package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectSummaryDto {

    private String id;

    private String title;

    private String slug;

    private String thumbnail;

    private String elevatorPitch;

}
