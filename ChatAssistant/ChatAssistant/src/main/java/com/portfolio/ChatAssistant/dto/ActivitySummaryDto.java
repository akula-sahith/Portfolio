package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActivitySummaryDto {

    private String id;
    private String title;
    private String organization;
    private String thumbnail;
}
