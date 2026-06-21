package com.portfolio.ChatAssistant.service;

import org.springframework.stereotype.Service;

@Service
public class KnowledgeService {

    public String getPortfolioContext(){

        return """
        Name: Akula Lakshmi Venkata Sahith

        Role:
        Full Stack Developer

        Skills:
        Java
        Spring Boot
        React
        Flutter
        AI/ML

        Projects:
        Sentinel X
        SpectrumOps
        Traffic Rule Detection

        AWS Cloud Practitioner
        """;
    }

}
