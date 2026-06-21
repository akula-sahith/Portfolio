package com.portfolio.ChatAssistant.dto;


import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIResponse {

    private String answer;

    private List<DisplayPayload> displayPayloads;

}