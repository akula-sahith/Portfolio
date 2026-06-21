package com.portfolio.ChatAssistant.repository;

import com.portfolio.ChatAssistant.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AchievementRepository
        extends MongoRepository<Achievement, String> {

    List<Achievement>
    findByTitleIgnoreCaseOrSlugIgnoreCase(
            String title,
            String slug
    );
}
