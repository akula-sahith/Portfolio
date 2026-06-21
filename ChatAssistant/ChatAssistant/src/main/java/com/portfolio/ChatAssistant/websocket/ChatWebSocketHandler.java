package com.portfolio.ChatAssistant.websocket;

import com.portfolio.ChatAssistant.dto.AIResponse;
import com.portfolio.ChatAssistant.dto.SocketMessage;
import com.portfolio.ChatAssistant.enums.MessageType;
import com.portfolio.ChatAssistant.enums.OrbState;
import com.portfolio.ChatAssistant.service.AIService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.portfolio.ChatAssistant.dto.DisplayPayload;

@Component
public class ChatWebSocketHandler
        extends TextWebSocketHandler {

        private final ObjectMapper mapper =
                new ObjectMapper()
                        .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule())
                        .disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        private final AIService aiService;

        public ChatWebSocketHandler(
                AIService aiService
        ) {
                this.aiService = aiService;
        }

        @Override
        public void afterConnectionEstablished(
                WebSocketSession session
        ) {

                System.out.println(
                        "Connected : "
                                + session.getId()
                );
        }

        @Override
        protected void handleTextMessage(
                WebSocketSession session,
                TextMessage message
        ) throws Exception {

                SocketMessage incoming =
                        mapper.readValue(
                                message.getPayload(),
                                SocketMessage.class
                        );

                if (incoming.getType() == MessageType.QUESTION) {
                        handleQuestion(session, incoming);
                } else {
                        handleOpenActions(session, incoming);
                }
        }

        private void handleQuestion(
                WebSocketSession session,
                SocketMessage incoming
        ) throws Exception {

                try {

                        sendState(
                                session,
                                OrbState.THINKING
                        );

                        AIResponse aiResponse =
                                aiService.generateResponse(
                                        incoming.getContent()
                                );

                        sendAIResponse(
                                session,
                                aiResponse
                        );

                } catch (Exception exception) {

                        if (session.isOpen()) {

                                sendState(
                                        session,
                                        OrbState.IDLE
                                );
                        }

                        throw exception;
                }
        }

        private void handleOpenActions(
                WebSocketSession session,
                SocketMessage incoming
        ) throws Exception {

                try {
                        sendState(session, OrbState.THINKING);

                        String entityId = incoming.getEntityId() != null
                                ? incoming.getEntityId()
                                : incoming.getProjectId();

                        AIResponse aiResponse = switch (incoming.getType()) {
                                case OPEN_PROJECT -> aiService.openProject(entityId);
                                case OPEN_CERTIFICATION -> aiService.openCertification(entityId);
                                case OPEN_EXPERIENCE -> aiService.openExperience(entityId);
                                case OPEN_RESEARCH -> aiService.openResearch(entityId);
                                case OPEN_ACHIEVEMENT -> aiService.openAchievement(entityId);
                                case OPEN_ACTIVITY -> aiService.openActivity(entityId);
                                default -> throw new IllegalArgumentException("Unknown OPEN type: " + incoming.getType());
                        };

                        sendAIResponse(session, aiResponse);

                } catch (Exception exception) {
                        if (session.isOpen()) {
                                sendState(session, OrbState.IDLE);
                        }
                        throw exception;
                }
        }

        /**
         * Sends display payloads, streams the
         * text response token by token, and
         * sends the DONE signal.
         */
        private void sendAIResponse(
                WebSocketSession session,
                AIResponse aiResponse
        ) throws Exception {

                String response =
                        aiResponse.getAnswer();

                if (response == null) {
                        response = "";
                }

                if(aiResponse.getDisplayPayloads() != null){

                        for(DisplayPayload payload
                                : aiResponse.getDisplayPayloads()){

                                SocketMessage displayMessage =
                                        SocketMessage.builder()
                                                .type(
                                                        MessageType.DISPLAY
                                                )
                                                .displayType(
                                                        payload
                                                                .getDisplayType()
                                                                .toString()
                                                )
                                                .payload(
                                                        payload.getPayload()
                                                )
                                                .build();

                                session.sendMessage(
                                        new TextMessage(
                                                mapper.writeValueAsString(
                                                        displayMessage
                                                )
                                        )
                                );
                        }
                }

                sendState(
                        session,
                        OrbState.SPEAKING
                );

                for (char letter
                        : response.toCharArray()) {

                        SocketMessage token =
                                SocketMessage.builder()
                                        .type(
                                                MessageType.TOKEN
                                        )
                                        .content(
                                                String.valueOf(
                                                        letter
                                                )
                                        )
                                        .build();

                        session.sendMessage(
                                new TextMessage(
                                        mapper.writeValueAsString(
                                                token
                                        )
                                )
                        );

                        Thread.sleep(30);
                }

                sendState(
                        session,
                        OrbState.IDLE
                );

                SocketMessage done =
                        SocketMessage.builder()
                                .type(
                                        MessageType.DONE
                                )
                                .state(
                                        OrbState.IDLE
                                )
                                .build();

                session.sendMessage(
                        new TextMessage(
                                mapper.writeValueAsString(
                                        done
                                )
                        )
                );
        }

        private void sendState(
                WebSocketSession session,
                OrbState state
        ) throws Exception {

                SocketMessage msg =
                        SocketMessage.builder()
                                .type(
                                        MessageType.STATE
                                )
                                .state(
                                        state
                                )
                                .build();

                session.sendMessage(
                        new TextMessage(
                                mapper.writeValueAsString(
                                        msg
                                )
                        )
                );
        }
}