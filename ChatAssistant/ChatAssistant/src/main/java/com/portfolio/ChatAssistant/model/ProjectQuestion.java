package com.portfolio.ChatAssistant.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectQuestion {

    private String question;

    private String answer;
}