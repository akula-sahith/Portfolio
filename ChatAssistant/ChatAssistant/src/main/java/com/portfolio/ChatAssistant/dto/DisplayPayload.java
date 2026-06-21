package com.portfolio.ChatAssistant.dto;

import com.portfolio.ChatAssistant.enums.DisplayIntent;
import com.portfolio.ChatAssistant.enums.DisplayType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class DisplayPayload {

    private DisplayIntent intent;

    private DisplayType displayType;

    private Object payload;

}