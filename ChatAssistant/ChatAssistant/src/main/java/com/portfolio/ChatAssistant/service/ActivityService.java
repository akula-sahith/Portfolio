package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.model.Activity;
import com.portfolio.ChatAssistant.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository
            activityRepository;

    public List<Activity> getByTitle(
            String title
    ) {
        String normalized = title == null
                ? ""
                : title.trim();

        return activityRepository
                .findByTitleIgnoreCaseOrSlugIgnoreCase(
                        normalized,
                        normalized
                );
    }

    public Optional<Activity> getById(
            String id
    ) {
        return activityRepository.findById(id);
    }

    public List<Activity> getAll() {
        return activityRepository.findAll();
    }
}
