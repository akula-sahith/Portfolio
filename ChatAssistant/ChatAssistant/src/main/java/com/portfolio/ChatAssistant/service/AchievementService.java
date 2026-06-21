package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.model.Achievement;
import com.portfolio.ChatAssistant.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository
            achievementRepository;

    public List<Achievement> getByTitle(
            String title
    ) {
        String normalized = title == null
                ? ""
                : title.trim();

        return achievementRepository
                .findByTitleIgnoreCaseOrSlugIgnoreCase(
                        normalized,
                        normalized
                );
    }

    public Optional<Achievement> getById(
            String id
    ) {
        return achievementRepository.findById(id);
    }

    public List<Achievement> getAll() {
        return achievementRepository.findAll();
    }
}
