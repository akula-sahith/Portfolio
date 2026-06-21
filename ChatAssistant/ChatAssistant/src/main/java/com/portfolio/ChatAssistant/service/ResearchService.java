package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.model.Research;
import com.portfolio.ChatAssistant.repository.ResearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResearchService {

    private final ResearchRepository
            researchRepository;

    public List<Research> getByTitle(
            String title
    ) {
        String normalized = title == null
                ? ""
                : title.trim();

        return researchRepository
                .findByTitleIgnoreCaseOrSlugIgnoreCase(
                        normalized,
                        normalized
                );
    }

    public Optional<Research> getById(
            String id
    ) {
        return researchRepository.findById(id);
    }

    public List<Research> getByTopic(
            String topic
    ) {
        String lowerTopic =
                topic.toLowerCase();

        return researchRepository
                .findAll()
                .stream()
                .filter(r -> {
                    boolean matchDomain =
                            r.getDomains() != null
                                    && r.getDomains()
                                    .stream()
                                    .anyMatch(d ->
                                            d.toLowerCase()
                                                    .contains(lowerTopic)
                                    );

                    boolean matchKeyword =
                            r.getKeywords() != null
                                    && r.getKeywords()
                                    .stream()
                                    .anyMatch(k ->
                                            k.toLowerCase()
                                                    .contains(lowerTopic)
                                    );

                    return matchDomain || matchKeyword;
                })
                .toList();
    }

    public List<Research> getBySkill(
            String skill
    ) {
        return researchRepository
                .findAll()
                .stream()
                .filter(r ->
                        r.getTechStack() != null
                                && r.getTechStack()
                                .stream()
                                .anyMatch(
                                        skill::equalsIgnoreCase
                                )
                )
                .toList();
    }

    public List<Research> getAll() {
        return researchRepository.findAll();
    }
}
