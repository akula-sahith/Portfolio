package com.portfolio.ChatAssistant.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResearchListDisplayDto {

    private List<ResearchSummaryDto> researches;
}
