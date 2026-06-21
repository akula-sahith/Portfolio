package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResearchSummaryDto {

    private String id;
    private String title;
    private String journal;
    private String thumbnail;
}
