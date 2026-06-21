package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.model.Experience;
import com.portfolio.ChatAssistant.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository
            experienceRepository;

    public List<Experience> getByTitle(
            String title
    ) {
        String normalized = title == null
                ? ""
                : title.trim();

        return experienceRepository
                .findByTitleIgnoreCaseOrSlugIgnoreCase(
                        normalized,
                        normalized
                );
    }

    public Optional<Experience> getById(
            String id
    ) {
        return experienceRepository.findById(id);
    }

    public List<Experience> getByTech(
            List<String> technologies
    ) {
        return experienceRepository
                .findAll()
                .stream()
                .filter(exp ->
                        exp.getTechStack() != null
                                && exp.getTechStack()
                                .stream()
                                .anyMatch(tech ->
                                        technologies
                                                .stream()
                                                .anyMatch(
                                                        tech::equalsIgnoreCase
                                                )
                                )
                )
                .toList();
    }

    public List<Experience> getBySkill(
            String skill
    ) {
        return experienceRepository
                .findAll()
                .stream()
                .filter(exp ->
                        exp.getSkills() != null
                                && exp.getSkills()
                                .stream()
                                .anyMatch(
                                        skill::equalsIgnoreCase
                                )
                )
                .toList();
    }

    public List<Experience> getAll() {
        return experienceRepository.findAll();
    }
}
