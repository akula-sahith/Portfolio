package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.model.Project;
import com.portfolio.ChatAssistant.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<Project> getProject(
            String title
    ){
        String normalizedTitle = title == null
                ? ""
                : title.trim();

        return projectRepository
                .findByTitleIgnoreCaseOrSlugIgnoreCase(
                        normalizedTitle,
                        normalizedTitle
                );
    }

//    public Project getProjectByTech(List<String> tech){
//        return projectRepository.findByTech(tech);
//    }

    public Project saveProject(Project project) {
        if (project == null) {
            throw new IllegalArgumentException("Project request body cannot be null");
        }

        LocalDateTime now = LocalDateTime.now();
        if (project.getId() == null) {
            project.setCreatedAt(now);
        }
        project.setUpdatedAt(now);

        if (project.getSlug() == null || project.getSlug().isBlank()) {
            String title = project.getTitle() == null ? "" : project.getTitle().trim();
            project.setSlug(title.toLowerCase().replaceAll("\\s+", "-"));
        }

        return projectRepository.save(project);
    }

    public long count(){

        return projectRepository.count();

    }

    public List<Project> getProjectsByTech(
            List<String> technologies
    ){

        return projectRepository
                .findAll()
                .stream()
                .filter(project ->
                        project.getTechStack()
                                .stream()
                                .anyMatch(tech ->
                                        technologies
                                                .stream()
                                                .anyMatch(tech::equalsIgnoreCase
                                                )
                                )
                )
                .toList();
    }

    public Project getProjectForDisplay(
            String question
    ){
        return projectRepository.findByTitleIgnoreCaseOrSlugIgnoreCase(question,question).getFirst();
    }

    public Optional<Project> getProjectById(
            String id
    ){
        return projectRepository.findById(id);
    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }
}
