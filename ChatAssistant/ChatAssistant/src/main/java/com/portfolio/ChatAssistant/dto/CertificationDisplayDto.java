package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class CertificationDisplayDto {

    private String title;
    private String issuer;
    private String description;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String credentialUrl;
    private String thumbnail;
    private String badgeUrl;
    private List<String> skills;
}
