package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.dto.*;
import com.portfolio.ChatAssistant.enums.DisplayType;
import com.portfolio.ChatAssistant.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class ToolService {

    private final ProjectService projectService;
    private final CertificationService certificationService;
    private final ExperienceService experienceService;
    private final ResearchService researchService;
    private final AchievementService achievementService;
    private final ActivityService activityService;

    private final List<DisplayPayload> displayPayloads =
            new ArrayList<>();

    public List<DisplayPayload> getDisplayPayloads() {
        return new ArrayList<>(displayPayloads);
    }

    public void clearDisplayPayloads() {
        displayPayloads.clear();
    }

    // =============================================
    // REUSABLE GENERIC HANDLER
    // =============================================

    /**
     * Applies the 3-rule logic for any domain:
     * 0 results → text only
     * 1 result  → SHOW_ITEM
     * N results → SHOW_COLLECTION
     *
     * Eliminates duplication across all domains.
     */
    private <T> String handleSearchResult(
            List<T> results,
            Function<T, String> contextBuilder,
            Function<T, DisplayPayload> itemPayloadBuilder,
            Function<List<T>, DisplayPayload> listPayloadBuilder,
            Function<T, String> titleExtractor,
            String entityName
    ) {

        if (results.isEmpty()) {
            return "No matching %s found."
                    .formatted(entityName);
        }

        if (results.size() == 1) {
            T item = results.getFirst();
            displayPayloads.add(
                    itemPayloadBuilder.apply(item)
            );
            return contextBuilder.apply(item);
        }

        displayPayloads.add(
                listPayloadBuilder.apply(results)
        );

        StringBuilder result =
                new StringBuilder();

        result.append(
                "Found %d matching %s."
                        .formatted(
                                results.size(),
                                entityName
                        )
        );

        for (T item : results) {
            result.append(
                    " %s."
                            .formatted(
                                    titleExtractor.apply(item)
                            )
            );
        }

        return result.toString();
    }

    // =============================================
    // PROJECT TOOLS
    // =============================================

    @Tool(
            description =
                    "Get details of a project by title"
    )
    public String fetchProjectDetails(
            String projectName
    ) {
        List<Project> projects =
                projectService.getProject(projectName);

        if (projects.isEmpty()) {
            return "No project found.";
        }

        Project project = projects.getFirst();
        rememberProjectForDisplay(project);
        return buildProjectContext(project);
    }

    @Tool(
            description =
                    "Find projects built using "
                            + "one or more technologies"
    )
    public String fetchProjectsByTech(
            List<String> technologies
    ) {
        return handleSearchResult(
                projectService.getProjectsByTech(
                        technologies
                ),
                this::buildProjectContext,
                this::buildProjectItemPayload,
                this::buildProjectListPayload,
                Project::getTitle,
                "projects"
        );
    }

    @Tool(
            description =
                    "List all projects in the portfolio"
    )
    public String fetchAllProjects() {
        return handleSearchResult(
                projectService.getAll(),
                this::buildProjectContext,
                this::buildProjectItemPayload,
                this::buildProjectListPayload,
                Project::getTitle,
                "projects"
        );
    }

    public void rememberProjectForDisplay(
            Project project
    ) {
        displayPayloads.add(
                buildProjectItemPayload(project)
        );
    }

    private DisplayPayload buildProjectItemPayload(
            Project project
    ) {
        return DisplayPayloadFactory.showItem(
                DisplayType.PROJECT,
                ProjectDisplayDto.builder()
                        .title(project.getTitle())
                        .elevatorPitch(
                                project.getElevatorPitch()
                        )
                        .thumbnail(project.getThumbnail())
                        .images(project.getImages())
                        .githubUrl(project.getGithubUrl())
                        .demoUrl(project.getDemoUrl())
                        .build()
        );
    }

    private DisplayPayload buildProjectListPayload(
            List<Project> projects
    ) {
        return DisplayPayloadFactory.showCollection(
                DisplayType.PROJECT_LIST,
                ProjectListDisplayDto.builder()
                        .projects(
                                projects.stream()
                                        .map(p -> ProjectSummaryDto.builder()
                                                .id(p.getId())
                                                .title(p.getTitle())
                                                .slug(p.getSlug())
                                                .thumbnail(p.getThumbnail())
                                                .elevatorPitch(
                                                        p.getElevatorPitch()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
        );
    }

    private String buildProjectContext(
            Project project
    ) {
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

    // =============================================
    // CERTIFICATION TOOLS
    // =============================================

    @Tool(
            description =
                    "Get details of a certification "
                            + "by name"
    )
    public String fetchCertificationDetails(
            String certificationName
    ) {
        List<Certification> certs =
                certificationService.getByTitle(
                        certificationName
                );

        if (certs.isEmpty()) {
            return "No certification found.";
        }

        Certification cert = certs.getFirst();
        rememberCertificationForDisplay(cert);
        return buildCertificationContext(cert);
    }

    @Tool(
            description =
                    "Find certifications related "
                            + "to a skill"
    )
    public String fetchCertificationsBySkill(
            String skill
    ) {
        return handleSearchResult(
                certificationService.getBySkill(skill),
                this::buildCertificationContext,
                this::buildCertificationItemPayload,
                this::buildCertificationListPayload,
                Certification::getTitle,
                "certifications"
        );
    }

    @Tool(
            description =
                    "List all certifications"
    )
    public String fetchAllCertifications() {
        return handleSearchResult(
                certificationService.getAll(),
                this::buildCertificationContext,
                this::buildCertificationItemPayload,
                this::buildCertificationListPayload,
                Certification::getTitle,
                "certifications"
        );
    }

    public void rememberCertificationForDisplay(
            Certification cert
    ) {
        displayPayloads.add(
                buildCertificationItemPayload(cert)
        );
    }

    private DisplayPayload buildCertificationItemPayload(
            Certification cert
    ) {
        return DisplayPayloadFactory.showItem(
                DisplayType.CERTIFICATION,
                CertificationDisplayDto.builder()
                        .title(cert.getTitle())
                        .issuer(cert.getIssuer())
                        .description(cert.getDescription())
                        .issueDate(cert.getIssueDate())
                        .expiryDate(cert.getExpiryDate())
                        .credentialUrl(
                                cert.getCredentialUrl()
                        )
                        .thumbnail(cert.getThumbnail())
                        .badgeUrl(cert.getBadgeUrl())
                        .skills(cert.getSkills())
                        .build()
        );
    }

    private DisplayPayload buildCertificationListPayload(
            List<Certification> certs
    ) {
        return DisplayPayloadFactory.showCollection(
                DisplayType.CERTIFICATION_LIST,
                CertificationListDisplayDto.builder()
                        .certifications(
                                certs.stream()
                                        .map(c -> CertificationSummaryDto
                                                .builder()
                                                .id(c.getId())
                                                .title(c.getTitle())
                                                .issuer(c.getIssuer())
                                                .thumbnail(
                                                        c.getThumbnail()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
        );
    }

    private String buildCertificationContext(
            Certification cert
    ) {
        return """
        Title: %s
        Issuer: %s
        Description: %s
        Issue Date: %s
        Skills: %s
        """
                .formatted(
                        cert.getTitle(),
                        cert.getIssuer(),
                        cert.getDescription(),
                        cert.getIssueDate(),
                        cert.getSkills()
                );
    }

    // =============================================
    // EXPERIENCE TOOLS
    // =============================================

    @Tool(
            description =
                    "Get details of a work experience "
                            + "by title or company name"
    )
    public String fetchExperienceDetails(
            String experienceTitle
    ) {
        List<Experience> experiences =
                experienceService.getByTitle(
                        experienceTitle
                );

        if (experiences.isEmpty()) {
            return "No experience found.";
        }

        Experience exp = experiences.getFirst();
        rememberExperienceForDisplay(exp);
        return buildExperienceContext(exp);
    }

    @Tool(
            description =
                    "Find work experiences involving "
                            + "specific technologies"
    )
    public String fetchExperienceByTech(
            List<String> technologies
    ) {
        return handleSearchResult(
                experienceService.getByTech(
                        technologies
                ),
                this::buildExperienceContext,
                this::buildExperienceItemPayload,
                this::buildExperienceListPayload,
                Experience::getTitle,
                "experiences"
        );
    }

    @Tool(
            description =
                    "List all work experiences"
    )
    public String fetchAllExperiences() {
        return handleSearchResult(
                experienceService.getAll(),
                this::buildExperienceContext,
                this::buildExperienceItemPayload,
                this::buildExperienceListPayload,
                Experience::getTitle,
                "experiences"
        );
    }

    public void rememberExperienceForDisplay(
            Experience exp
    ) {
        displayPayloads.add(
                buildExperienceItemPayload(exp)
        );
    }

    private DisplayPayload buildExperienceItemPayload(
            Experience exp
    ) {
        return DisplayPayloadFactory.showItem(
                DisplayType.EXPERIENCE,
                ExperienceDisplayDto.builder()
                        .title(exp.getTitle())
                        .company(exp.getCompany())
                        .location(exp.getLocation())
                        .employmentType(
                                exp.getEmploymentType()
                        )
                        .startDate(exp.getStartDate())
                        .endDate(exp.getEndDate())
                        .description(exp.getDescription())
                        .responsibilities(
                                exp.getResponsibilities()
                        )
                        .achievements(
                                exp.getAchievements()
                        )
                        .techStack(exp.getTechStack())
                        .thumbnail(exp.getThumbnail())
                        .companyUrl(exp.getCompanyUrl())
                        .build()
        );
    }

    private DisplayPayload buildExperienceListPayload(
            List<Experience> experiences
    ) {
        return DisplayPayloadFactory.showCollection(
                DisplayType.EXPERIENCE_LIST,
                ExperienceListDisplayDto.builder()
                        .experiences(
                                experiences.stream()
                                        .map(e -> ExperienceSummaryDto
                                                .builder()
                                                .id(e.getId())
                                                .title(e.getTitle())
                                                .company(e.getCompany())
                                                .thumbnail(
                                                        e.getThumbnail()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
        );
    }

    private String buildExperienceContext(
            Experience exp
    ) {
        return """
        Title: %s
        Company: %s
        Type: %s
        Duration: %s to %s
        Description: %s
        Responsibilities: %s
        Achievements: %s
        Tech Stack: %s
        """
                .formatted(
                        exp.getTitle(),
                        exp.getCompany(),
                        exp.getEmploymentType(),
                        exp.getStartDate(),
                        exp.getEndDate(),
                        exp.getDescription(),
                        exp.getResponsibilities(),
                        exp.getAchievements(),
                        exp.getTechStack()
                );
    }

    // =============================================
    // RESEARCH TOOLS
    // =============================================

    @Tool(
            description =
                    "Get details of a research paper "
                            + "by title"
    )
    public String fetchResearchDetails(
            String researchTitle
    ) {
        List<Research> papers =
                researchService.getByTitle(
                        researchTitle
                );

        if (papers.isEmpty()) {
            return "No research paper found.";
        }

        Research paper = papers.getFirst();
        rememberResearchForDisplay(paper);
        return buildResearchContext(paper);
    }

    @Tool(
            description =
                    "Find research papers on a topic "
                            + "or domain"
    )
    public String fetchResearchByTopic(
            String topic
    ) {
        return handleSearchResult(
                researchService.getByTopic(topic),
                this::buildResearchContext,
                this::buildResearchItemPayload,
                this::buildResearchListPayload,
                Research::getTitle,
                "research papers"
        );
    }

    @Tool(
            description =
                    "List all research papers"
    )
    public String fetchAllResearch() {
        return handleSearchResult(
                researchService.getAll(),
                this::buildResearchContext,
                this::buildResearchItemPayload,
                this::buildResearchListPayload,
                Research::getTitle,
                "research papers"
        );
    }

    public void rememberResearchForDisplay(
            Research paper
    ) {
        displayPayloads.add(
                buildResearchItemPayload(paper)
        );
    }

    private DisplayPayload buildResearchItemPayload(
            Research paper
    ) {
        return DisplayPayloadFactory.showItem(
                DisplayType.RESEARCH,
                ResearchDisplayDto.builder()
                        .title(paper.getTitle())
                        .abstractText(
                                paper.getAbstractText()
                        )
                        .journal(paper.getJournal())
                        .conference(paper.getConference())
                        .publishDate(
                                paper.getPublishDate()
                        )
                        .authors(paper.getAuthors())
                        .doi(paper.getDoi())
                        .url(paper.getUrl())
                        .thumbnail(paper.getThumbnail())
                        .keywords(paper.getKeywords())
                        .build()
        );
    }

    private DisplayPayload buildResearchListPayload(
            List<Research> papers
    ) {
        return DisplayPayloadFactory.showCollection(
                DisplayType.RESEARCH_LIST,
                ResearchListDisplayDto.builder()
                        .researches(
                                papers.stream()
                                        .map(r -> ResearchSummaryDto
                                                .builder()
                                                .id(r.getId())
                                                .title(r.getTitle())
                                                .journal(r.getJournal())
                                                .thumbnail(
                                                        r.getThumbnail()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
        );
    }

    private String buildResearchContext(
            Research paper
    ) {
        return """
        Title: %s
        Abstract: %s
        Journal: %s
        Conference: %s
        Published: %s
        Authors: %s
        Keywords: %s
        """
                .formatted(
                        paper.getTitle(),
                        paper.getAbstractText(),
                        paper.getJournal(),
                        paper.getConference(),
                        paper.getPublishDate(),
                        paper.getAuthors(),
                        paper.getKeywords()
                );
    }

    // =============================================
    // ACHIEVEMENT TOOLS
    // =============================================

    @Tool(
            description =
                    "Get details of an achievement "
                            + "by title"
    )
    public String fetchAchievementDetails(
            String achievementTitle
    ) {
        List<Achievement> achievements =
                achievementService.getByTitle(
                        achievementTitle
                );

        if (achievements.isEmpty()) {
            return "No achievement found.";
        }

        Achievement ach = achievements.getFirst();
        rememberAchievementForDisplay(ach);
        return buildAchievementContext(ach);
    }

    @Tool(
            description =
                    "List all achievements, awards, "
                            + "and competitions"
    )
    public String fetchAllAchievements() {

        return handleSearchResult(
                achievementService.getAll(),
                this::buildAchievementContext,
                this::buildAchievementItemPayload,
                this::buildAchievementListPayload,
                Achievement::getTitle,
                "achievements"
        );
    }

    public void rememberAchievementForDisplay(
            Achievement ach
    ) {
        displayPayloads.add(
                buildAchievementItemPayload(ach)
        );
    }

    private DisplayPayload buildAchievementItemPayload(
            Achievement ach
    ) {
        return DisplayPayloadFactory.showItem(
                DisplayType.ACHIEVEMENT,
                AchievementDisplayDto.builder()
                        .title(ach.getTitle())
                        .description(
                                ach.getDescription()
                        )
                        .date(ach.getDate())
                        .organization(
                                ach.getOrganization()
                        )
                        .category(ach.getCategory())
                        .thumbnail(ach.getThumbnail())
                        .url(ach.getUrl())
                        .build()
        );
    }

    private DisplayPayload buildAchievementListPayload(
            List<Achievement> achievements
    ) {
        return DisplayPayloadFactory.showCollection(
                DisplayType.ACHIEVEMENT_LIST,
                AchievementListDisplayDto.builder()
                        .achievements(
                                achievements.stream()
                                        .map(a -> AchievementSummaryDto
                                                .builder()
                                                .id(a.getId())
                                                .title(a.getTitle())
                                                .organization(
                                                        a.getOrganization()
                                                )
                                                .thumbnail(
                                                        a.getThumbnail()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
        );
    }

    private String buildAchievementContext(
            Achievement ach
    ) {
        return """
        Title: %s
        Description: %s
        Date: %s
        Organization: %s
        Category: %s
        """
                .formatted(
                        ach.getTitle(),
                        ach.getDescription(),
                        ach.getDate(),
                        ach.getOrganization(),
                        ach.getCategory()
                );
    }

    // =============================================
    // ACTIVITY TOOLS
    // =============================================

    @Tool(
            description =
                    "Get details of an extracurricular "
                            + "activity by title"
    )
    public String fetchActivityDetails(
            String activityTitle
    ) {
        List<Activity> activities =
                activityService.getByTitle(
                        activityTitle
                );

        if (activities.isEmpty()) {
            return "No activity found.";
        }

        Activity act = activities.getFirst();
        rememberActivityForDisplay(act);
        return buildActivityContext(act);
    }

    @Tool(
            description =
                    "List all extracurricular "
                            + "activities"
    )
    public String fetchAllActivities() {

        return handleSearchResult(
                activityService.getAll(),
                this::buildActivityContext,
                this::buildActivityItemPayload,
                this::buildActivityListPayload,
                Activity::getTitle,
                "activities"
        );
    }

    public void rememberActivityForDisplay(
            Activity act
    ) {
        displayPayloads.add(
                buildActivityItemPayload(act)
        );
    }

    private DisplayPayload buildActivityItemPayload(
            Activity act
    ) {
        return DisplayPayloadFactory.showItem(
                DisplayType.ACTIVITY,
                ActivityDisplayDto.builder()
                        .title(act.getTitle())
                        .description(
                                act.getDescription()
                        )
                        .organization(
                                act.getOrganization()
                        )
                        .role(act.getRole())
                        .startDate(act.getStartDate())
                        .endDate(act.getEndDate())
                        .category(act.getCategory())
                        .thumbnail(act.getThumbnail())
                        .url(act.getUrl())
                        .achievements(
                                act.getAchievements()
                        )
                        .build()
        );
    }

    private DisplayPayload buildActivityListPayload(
            List<Activity> activities
    ) {
        return DisplayPayloadFactory.showCollection(
                DisplayType.ACTIVITY_LIST,
                ActivityListDisplayDto.builder()
                        .activities(
                                activities.stream()
                                        .map(a -> ActivitySummaryDto
                                                .builder()
                                                .id(a.getId())
                                                .title(a.getTitle())
                                                .organization(
                                                        a.getOrganization()
                                                )
                                                .thumbnail(
                                                        a.getThumbnail()
                                                )
                                                .build()
                                        )
                                        .toList()
                        )
                        .build()
        );
    }

    private String buildActivityContext(
            Activity act
    ) {
        return """
        Title: %s
        Description: %s
        Organization: %s
        Role: %s
        Duration: %s to %s
        Category: %s
        Achievements: %s
        """
                .formatted(
                        act.getTitle(),
                        act.getDescription(),
                        act.getOrganization(),
                        act.getRole(),
                        act.getStartDate(),
                        act.getEndDate(),
                        act.getCategory(),
                        act.getAchievements()
                );
    }

    // =============================================
    // SKILL EVIDENCE TOOL
    // =============================================

    @Tool(
            description =
                    "Find evidence of a skill across "
                            + "projects, experience, "
                            + "certifications, and research"
    )
    public String fetchSkillEvidence(
            String skillName
    ) {

        List<ProjectSummaryDto> projectEvidence =
                projectService.getProjectsByTech(
                                List.of(skillName)
                        )
                        .stream()
                        .map(p -> ProjectSummaryDto.builder()
                                .id(p.getId())
                                .title(p.getTitle())
                                .slug(p.getSlug())
                                .thumbnail(p.getThumbnail())
                                .elevatorPitch(
                                        p.getElevatorPitch()
                                )
                                .build()
                        )
                        .toList();

        List<ExperienceSummaryDto> experienceEvidence =
                experienceService.getBySkill(skillName)
                        .stream()
                        .map(e -> ExperienceSummaryDto.builder()
                                .id(e.getId())
                                .title(e.getTitle())
                                .company(e.getCompany())
                                .thumbnail(e.getThumbnail())
                                .build()
                        )
                        .toList();

        List<CertificationSummaryDto> certEvidence =
                certificationService.getBySkill(skillName)
                        .stream()
                        .map(c -> CertificationSummaryDto
                                .builder()
                                .id(c.getId())
                                .title(c.getTitle())
                                .issuer(c.getIssuer())
                                .thumbnail(c.getThumbnail())
                                .build()
                        )
                        .toList();

        List<ResearchSummaryDto> researchEvidence =
                researchService.getBySkill(skillName)
                        .stream()
                        .map(r -> ResearchSummaryDto.builder()
                                .id(r.getId())
                                .title(r.getTitle())
                                .journal(r.getJournal())
                                .thumbnail(r.getThumbnail())
                                .build()
                        )
                        .toList();

        int totalEvidence =
                projectEvidence.size()
                        + experienceEvidence.size()
                        + certEvidence.size()
                        + researchEvidence.size();

        if (totalEvidence == 0) {
            return "No evidence found for skill: "
                    + skillName;
        }

        String skillLevel =
                totalEvidence >= 5 ? "Advanced"
                        : totalEvidence >= 3 ? "Intermediate"
                        : "Beginner";

        SkillEvidenceDisplayDto evidence =
                SkillEvidenceDisplayDto.builder()
                        .skillName(skillName)
                        .skillLevel(skillLevel)
                        .relatedProjects(projectEvidence)
                        .relatedExperience(
                                experienceEvidence
                        )
                        .relatedCertifications(
                                certEvidence
                        )
                        .relatedResearch(researchEvidence)
                        .build();

        displayPayloads.add(
                DisplayPayloadFactory.showItem(
                        DisplayType.SKILL_EVIDENCE,
                        evidence
                )
        );

        return """
        Skill: %s
        Level: %s
        Projects: %d
        Experience: %d
        Certifications: %d
        Research: %d
        """
                .formatted(
                        skillName,
                        skillLevel,
                        projectEvidence.size(),
                        experienceEvidence.size(),
                        certEvidence.size(),
                        researchEvidence.size()
                );
    }
}