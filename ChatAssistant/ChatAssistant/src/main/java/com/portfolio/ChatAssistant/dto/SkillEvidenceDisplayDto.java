package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SkillEvidenceDisplayDto {

    private String skillName;

    private String skillLevel;

    private List<ProjectSummaryDto>
            relatedProjects;

    private List<ExperienceSummaryDto>
            relatedExperience;

    private List<CertificationSummaryDto>
            relatedCertifications;

    private List<ResearchSummaryDto>
            relatedResearch;
}
