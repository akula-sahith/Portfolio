package com.portfolio.ChatAssistant.repository;

import com.portfolio.ChatAssistant.model.Certification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CertificationRepository
        extends MongoRepository<Certification, String> {

    List<Certification>
    findByTitleIgnoreCaseOrSlugIgnoreCase(
            String title,
            String slug
    );
}
