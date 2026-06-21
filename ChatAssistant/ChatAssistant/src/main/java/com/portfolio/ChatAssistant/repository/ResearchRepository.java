package com.portfolio.ChatAssistant.repository;

import com.portfolio.ChatAssistant.model.Research;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResearchRepository
        extends MongoRepository<Research, String> {

    List<Research>
    findByTitleIgnoreCaseOrSlugIgnoreCase(
            String title,
            String slug
    );
}
