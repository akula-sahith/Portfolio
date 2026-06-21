package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CertificationSummaryDto {

    private String id;
    private String title;
    private String issuer;
    private String thumbnail;
}
