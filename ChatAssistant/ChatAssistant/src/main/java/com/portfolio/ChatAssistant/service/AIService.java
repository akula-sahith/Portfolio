package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.dto.AIResponse;
import com.portfolio.ChatAssistant.dto.DisplayPayload;
import com.portfolio.ChatAssistant.model.*;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.mistralai.MistralAiChatModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;

@Service
public class AIService {

    private final ChatClient chatClient;
    private final ToolService toolService;
    private final ProjectService projectService;
    private final CertificationService certificationService;
    private final ExperienceService experienceService;
    private final ResearchService researchService;
    private final AchievementService achievementService;
    private final ActivityService activityService;

    public AIService(
            MistralAiChatModel mistralAiChatModel,
            ToolService toolService,
            ProjectService projectService,
            CertificationService certificationService,
            ExperienceService experienceService,
            ResearchService researchService,
            AchievementService achievementService,
            ActivityService activityService
    ) {

        this.chatClient = ChatClient.builder(mistralAiChatModel).build();
        this.toolService = toolService;
        this.projectService = projectService;
        this.certificationService = certificationService;
        this.experienceService = experienceService;
        this.researchService = researchService;
        this.achievementService = achievementService;
        this.activityService = activityService;
    }

    public AIResponse callMistral(String question) {

        String systemPrompt = """
                You are AXIOM.
                
                You are Sahith's personal AI assistant.
                
                When questions involve projects, experience, certifications, research, achievements, or activities,
                use the available tools.
                
                Always answer as a professional representative of Sahith.
                Keep answers concise and factual.
                
                When multiple items are found, do not list individual names in your response.
                The display system will present the collection.
                Simply acknowledge the results were found and invite the user to explore.
                """;

        String answer = chatClient.prompt()
                .system(systemPrompt)
                .user(question)
                .tools(toolService)
                .call()
                .content();

        List<DisplayPayload> displayPayloads = toolService.getDisplayPayloads();
        toolService.clearDisplayPayloads();

        return AIResponse.builder()
                .answer(answer)
                .displayPayloads(displayPayloads)
                .build();
    }

    public AIResponse generateResponse(String question) {
        return callMistral(question);
    }

    // =============================================
    // REUSABLE GENERIC OPEN HANDLER
    // =============================================

    /**
     * Generic method to handle OPEN_* actions for any entity.
     * Eliminates duplication across all 6 domains.
     */
    private <T> AIResponse openEntity(
            String entityId,
            Function<String, Optional<T>> fetcher,
            Consumer<T> displayRememberer,
            Function<T, String> contextBuilder,
            String entityName
    ) {
        Optional<T> optionalEntity = fetcher.apply(entityId);

        if (optionalEntity.isEmpty()) {
            return AIResponse.builder()
                    .answer("Sorry, I couldn't find that " + entityName + ".")
                    .displayPayloads(List.of())
                    .build();
        }

        T entity = optionalEntity.get();

        // 1. Remember for display payload
        displayRememberer.accept(entity);

        // 2. Build context string
        String context = contextBuilder.apply(entity);

        // 3. Ask AI for explanation
        String prompt = "Explain this " + entityName + " concisely and professionally:\n\n" + context;
        String answer = chatClient.prompt()
                .system("You are AXIOM, Sahith's AI assistant. Keep it concise.")
                .user(prompt)
                .call()
                .content();

        // 4. Gather payloads
        List<DisplayPayload> displayPayloads = toolService.getDisplayPayloads();
        toolService.clearDisplayPayloads();

        return AIResponse.builder()
                .answer(answer)
                .displayPayloads(displayPayloads)
                .build();
    }

    // =============================================
    // SPECIFIC OPEN METHODS
    // =============================================

    public AIResponse openProject(String projectId) {
        return openEntity(
                projectId,
                projectService::getProjectById,
                toolService::rememberProjectForDisplay,
                this::buildProjectContext,
                "project"
        );
    }

    public AIResponse openCertification(String id) {
        return openEntity(
                id,
                certificationService::getById,
                toolService::rememberCertificationForDisplay,
                this::buildCertificationContext,
                "certification"
        );
    }

    public AIResponse openExperience(String id) {
        return openEntity(
                id,
                experienceService::getById,
                toolService::rememberExperienceForDisplay,
                this::buildExperienceContext,
                "experience"
        );
    }

    public AIResponse openResearch(String id) {
        return openEntity(
                id,
                researchService::getById,
                toolService::rememberResearchForDisplay,
                this::buildResearchContext,
                "research paper"
        );
    }

    public AIResponse openAchievement(String id) {
        return openEntity(
                id,
                achievementService::getById,
                toolService::rememberAchievementForDisplay,
                this::buildAchievementContext,
                "achievement"
        );
    }

    public AIResponse openActivity(String id) {
        return openEntity(
                id,
                activityService::getById,
                toolService::rememberActivityForDisplay,
                this::buildActivityContext,
                "activity"
        );
    }

    // =============================================
    // CONTEXT BUILDERS
    // =============================================

    private String buildProjectContext(Project project) {
        return """
                Title: %s
                Elevator Pitch: %s
                Problem: %s
                Solution: %s
                Tech Stack: %s
                Achievements: %s
                """
                .formatted(
                        project.getTitle(),
                        project.getElevatorPitch(),
                        project.getProblem(),
                        project.getSolution(),
                        project.getTechStack(),
                        project.getAchievements()
                );
    }

    private String buildCertificationContext(Certification cert) {
        return """
                Title: %s
                Issuer: %s
                Description: %s
                """
                .formatted(
                        cert.getTitle(),
                        cert.getIssuer(),
                        cert.getDescription()
                );
    }

    private String buildExperienceContext(Experience exp) {
        return """
                Title: %s
                Company: %s
                Type: %s
                Description: %s
                Responsibilities: %s
                """
                .formatted(
                        exp.getTitle(),
                        exp.getCompany(),
                        exp.getEmploymentType(),
                        exp.getDescription(),
                        exp.getResponsibilities()
                );
    }

    private String buildResearchContext(Research paper) {
        return """
                Title: %s
                Abstract: %s
                Journal: %s
                Conference: %s
                """
                .formatted(
                        paper.getTitle(),
                        paper.getAbstractText(),
                        paper.getJournal(),
                        paper.getConference()
                );
    }

    private String buildAchievementContext(Achievement ach) {
        return """
                Title: %s
                Description: %s
                Organization: %s
                """
                .formatted(
                        ach.getTitle(),
                        ach.getDescription(),
                        ach.getOrganization()
                );
    }

    private String buildActivityContext(Activity act) {
        return """
                Title: %s
                Description: %s
                Organization: %s
                Role: %s
                """
                .formatted(
                        act.getTitle(),
                        act.getDescription(),
                        act.getOrganization(),
                        act.getRole()
                );
    }
}