package com.portfolio.ChatAssistant.dto;

import com.portfolio.ChatAssistant.enums.MessageType;
import com.portfolio.ChatAssistant.enums.OrbState;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocketMessage {

    private MessageType type;

    private String content;

    private OrbState state;

    private String displayType;

    private String referenceId;

    private String projectId;

    private String entityId;

    private Object payload;
}