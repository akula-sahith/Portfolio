package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProjectListDisplayDto {

    private List<ProjectSummaryDto> projects;

}
