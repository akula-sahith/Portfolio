package com.portfolio.ChatAssistant.repository;

// import com.networknt.schema.OutputFormat.List;
import java.util.List;
import com.portfolio.ChatAssistant.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProjectRepository
        extends MongoRepository<Project,String> {

    Optional<Project> findByTitleIgnoreCase(
            String title
    );

    List<Project>
findByTitleIgnoreCaseOrSlugIgnoreCase(
        String title,
        String slug
);


}
