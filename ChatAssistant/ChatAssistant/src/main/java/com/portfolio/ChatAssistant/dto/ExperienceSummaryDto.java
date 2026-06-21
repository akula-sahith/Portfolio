package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExperienceSummaryDto {

    private String id;
    private String title;
    private String company;
    private String thumbnail;
}
