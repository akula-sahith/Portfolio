package com.portfolio.ChatAssistant.repository;

import com.portfolio.ChatAssistant.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActivityRepository
        extends MongoRepository<Activity, String> {

    List<Activity>
    findByTitleIgnoreCaseOrSlugIgnoreCase(
            String title,
            String slug
    );
}
