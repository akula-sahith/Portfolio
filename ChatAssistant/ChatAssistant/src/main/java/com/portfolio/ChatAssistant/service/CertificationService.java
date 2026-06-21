package com.portfolio.ChatAssistant.service;

import com.portfolio.ChatAssistant.model.Certification;
import com.portfolio.ChatAssistant.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository
            certificationRepository;

    public List<Certification> getByTitle(
            String title
    ) {
        String normalized = title == null
                ? ""
                : title.trim();

        return certificationRepository
                .findByTitleIgnoreCaseOrSlugIgnoreCase(
                        normalized,
                        normalized
                );
    }

    public Optional<Certification> getById(
            String id
    ) {
        return certificationRepository.findById(id);
    }

    public List<Certification> getBySkill(
            String skill
    ) {
        return certificationRepository
                .findAll()
                .stream()
                .filter(cert ->
                        cert.getSkills() != null
                                && cert.getSkills()
                                .stream()
                                .anyMatch(
                                        skill::equalsIgnoreCase
                                )
                )
                .toList();
    }

    public List<Certification> getAll() {
        return certificationRepository.findAll();
    }
}
