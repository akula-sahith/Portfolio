package com.portfolio.ChatAssistant.repository;

import com.portfolio.ChatAssistant.model.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExperienceRepository
        extends MongoRepository<Experience, String> {

    List<Experience>
    findByTitleIgnoreCaseOrSlugIgnoreCase(
            String title,
            String slug
    );
}
