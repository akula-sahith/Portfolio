package com.portfolio.ChatAssistant.config;

import com.portfolio.ChatAssistant.model.*;
import com.portfolio.ChatAssistant.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final CertificationRepository certificationRepository;
    private final ResearchRepository researchRepository;
    private final AchievementRepository achievementRepository;
    private final ActivityRepository activityRepository;
    private final ExperienceRepository experienceRepository;

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting DataSeeder...");

        seedCertifications();
        seedResearch();
        seedAchievements();
        seedActivities();
        seedExperience();

        log.info("DataSeeder finished successfully.");
    }

    private void seedCertifications() {
        List<Certification> certifications = List.of(
                Certification.builder()
                        .title("AWS Certified Cloud Practitioner")
                        .issuer("Amazon Web Services")
                        .issueDate(LocalDate.of(2026, 3, 1))
                        .credentialUrl("1wrJMQTQdU_bbpObnXmtLhOZTY29vu-pb")
                        .domains(List.of("Cloud"))
                        .skills(List.of("AWS", "Cloud Computing"))
                        .build(),
                Certification.builder()
                        .title("Docker Mastery")
                        .issuer("Udemy")
                        .issueDate(LocalDate.of(2026, 5, 1))
                        .credentialUrl("1dcE7k3GkCvM_07BK_MPB27mFcWyP9c9-")
                        .domains(List.of("DevOps"))
                        .skills(List.of("Docker", "Containerization"))
                        .build(),
                Certification.builder()
                        .title("Spring Boot Development")
                        .issuer("Udemy")
                        .issueDate(LocalDate.of(2026, 5, 1))
                        .credentialUrl("1SMWQ_zZ_oKJSCUd1V9JtkkcsKonpEWEO")
                        .domains(List.of("Backend"))
                        .skills(List.of("Spring Boot", "Java"))
                        .build(),
                Certification.builder()
                        .title("CLA: Programming Essentials in C")
                        .issuer("Cisco Networking Academy")
                        .issueDate(LocalDate.of(2024, 1, 1))
                        .credentialUrl("1_Tcymn02xdnybudmeeX2krKvrEtbYBLq")
                        .domains(List.of("Programming"))
                        .skills(List.of("C"))
                        .build(),
                Certification.builder()
                        .title("CPA: Programming Essentials in C++")
                        .issuer("Cisco Networking Academy")
                        .issueDate(LocalDate.of(2024, 9, 1))
                        .credentialUrl("1fLuNF5acrg0zzFrbdj43HpKSkmjZUApW")
                        .domains(List.of("Programming"))
                        .skills(List.of("C++"))
                        .build(),
                Certification.builder()
                        .title("PCAP: Programming Essentials in Python")
                        .issuer("Cisco Networking Academy")
                        .issueDate(LocalDate.of(2024, 5, 4))
                        .credentialUrl("1UwJYANXvxomoMRbY-CfACoLX8SlDPb-R")
                        .domains(List.of("Programming"))
                        .skills(List.of("Python"))
                        .build(),
                Certification.builder()
                        .title("Java Programming for Beginners")
                        .issuer("SkillUp by Simplilearn")
                        .issueDate(LocalDate.of(2023, 9, 1))
                        .credentialUrl("17mIDXzQIPO9cH0yvqTa4vRc7IpPeGfMq")
                        .domains(List.of("Programming"))
                        .skills(List.of("Java"))
                        .build(),
                Certification.builder()
                        .title("Java (Basic)")
                        .issuer("HackerRank")
                        .issueDate(LocalDate.of(2025, 1, 1))
                        .credentialUrl("1uf2mA0QHoP4bGVKWcpJC96GFBzEWeqUt")
                        .domains(List.of("Programming"))
                        .skills(List.of("Java"))
                        .build(),
                Certification.builder()
                        .title("Python (Basic)")
                        .issuer("HackerRank")
                        .issueDate(LocalDate.of(2025, 1, 1))
                        .credentialUrl("10VCkER-d3jSrF5Spnm0MI9OYX3trTrWX")
                        .domains(List.of("Programming"))
                        .skills(List.of("Python"))
                        .build(),
                Certification.builder()
                        .title("The Joy of Computing Using Python")
                        .issuer("NPTEL / IIT Madras")
                        .issueDate(LocalDate.of(2024, 10, 1))
                        .credentialUrl("1CpodCn7LFJpLQfNGGQaAGlfq-22Y2ZNt")
                        .domains(List.of("AI/ML"))
                        .skills(List.of("Python", "Computing"))
                        .build(),
                Certification.builder()
                        .title("Understanding Incubation and Entrepreneurship")
                        .issuer("NPTEL / IIT Madras")
                        .issueDate(LocalDate.of(2025, 10, 1))
                        .credentialUrl("1efOFBCBeUskCHd9D4e0aHKSIALQEoOHU")
                        .domains(List.of("Entrepreneurship"))
                        .skills(List.of("Entrepreneurship", "Incubation"))
                        .build()
        );

        for (Certification cert : certifications) {
            if (certificationRepository.findByTitleIgnoreCaseOrSlugIgnoreCase(cert.getTitle(), cert.getTitle()).isEmpty()) {
                cert.setCreatedAt(LocalDateTime.now());
                certificationRepository.save(cert);
                log.info("Inserted Certification: {}", cert.getTitle());
            }
        }
    }

    private void seedResearch() {
        Research trafficSignPaper = Research.builder()
                .title("Traffic Sign Recognition & Alert")
                .slug("traffic-sign-recognition-alert")
                .abstractText("Trained a YOLOv12 model on Indian traffic sign data with a Flask+Spring Boot+MongoDB stack, achieving real-time alerts. Need an automated way to detect traffic violations and correlate vehicle actions with traffic signs in real-time. A YOLOv12-based model achieving 95% mAP@50 and an automated violation detection engine reaching 94% accuracy, communicating to a Flutter app within 1-2s.")
                .url("https://drive.google.com/drive/u/0/folders/1OfMVylGdW3eYLVlDGaPnad63w9T1Y0Af")
                .techStack(List.of("Python", "Flask", "Spring Boot", "Flutter", "MongoDB", "Firebase", "YOLOv12"))
                .keywords(List.of("Computer Vision", "Object Detection", "Real-Time Alerts"))
                .publishDate(LocalDate.now())
                .createdAt(LocalDateTime.now())
                .build();

        if (researchRepository.findByTitleIgnoreCaseOrSlugIgnoreCase(trafficSignPaper.getTitle(), trafficSignPaper.getSlug()).isEmpty()) {
            researchRepository.save(trafficSignPaper);
            log.info("Inserted Research: {}", trafficSignPaper.getTitle());
        }
    }

    private void seedAchievements() {
        List<Achievement> achievements = List.of(
                Achievement.builder()
                        .title("95% mAP@50 on Traffic Sign Detection")
                        .description("Achieved highly accurate real-time object detection using a YOLOv12 model trained on Indian traffic sign data.")
                        .category("Technical Performance")
                        .build(),
                Achievement.builder()
                        .title("94% Violation Detection Accuracy")
                        .description("Built an automated violation detection engine that reliably identifies traffic offenses.")
                        .category("Technical Performance")
                        .build(),
                Achievement.builder()
                        .title("Published Research Paper")
                        .description("Published research on Traffic Sign Recognition and real-time alerts.")
                        .category("Publication")
                        .build(),
                Achievement.builder()
                        .title("Hackerrank Orchestrate - 24Hrs Agent Building Hackathon")
                        .description("Ranked 366 out of 1300+ participants")
                        .category("Hackathon")
                        .build(),
                Achievement.builder()
                        .title("24 Hours Hackathon")
                        .description("Secured 2nd Prize.")
                        .organization("Potti Sree Ramulu College of Engineering")
                        .category("Hackathon")
                        .build(),
                Achievement.builder()
                        .title("StartUp Competition")
                        .description("Secured 1st Prize.")
                        .organization("College Level Startup Competition")
                        .category("Competition")
                        .build(),
                Achievement.builder()
                        .title("Game of Algorithms")
                        .description("Secured 1st Prize.")
                        .organization("College Level Coding Competition")
                        .category("Competition")
                        .build(),
                Achievement.builder()
                        .title("CodeVoyage")
                        .description("Secured 3rd Prize.")
                        .organization("College Level Coding Competition")
                        .category("Competition")
                        .build()
        );

        for (Achievement ach : achievements) {
            if (achievementRepository.findByTitleIgnoreCaseOrSlugIgnoreCase(ach.getTitle(), ach.getTitle()).isEmpty()) {
                ach.setCreatedAt(LocalDateTime.now());
                achievementRepository.save(ach);
                log.info("Inserted Achievement: {}", ach.getTitle());
            }
        }
    }

    private void seedActivities() {
        List<Activity> activities = List.of(
                Activity.builder()
                        .title("Institute Innovation Council")
                        .category("College Level")
                        .role("Vice Convener")
                        .description("Led student initiatives in innovation, entrepreneurship and tech development.")
                        .build(),
                Activity.builder()
                        .title("Hackathon Organizer")
                        .category("Tech Fest")
                        .role("Tech Lead")
                        .description("Organized and managed technical logistics for college-level hackathons. (CodeFusion, Omnitrix)")
                        .build()
        );

        for (Activity act : activities) {
            if (activityRepository.findByTitleIgnoreCaseOrSlugIgnoreCase(act.getTitle(), act.getTitle()).isEmpty()) {
                act.setCreatedAt(LocalDateTime.now());
                activityRepository.save(act);
                log.info("Inserted Activity: {}", act.getTitle());
            }
        }
    }

    private void seedExperience() {
        List<Experience> experiences = List.of(
                Experience.builder()
                        .title("Full Stack Developer Intern")
                        .company("Univybe")
                        .location("Remote / Hybrid")
                        .startDate(LocalDate.of(2026, 1, 1))
                        .endDate(LocalDate.of(2026, 4, 30))
                        .description("Developed full-stack web applications using React.js for frontend and Spring Boot for backend REST APIs. Developed a Flutter mobile application for a client to manage service bookings and receive real-time notifications using Firebase Cloud Messaging (FCM). Collaborated in an Agile environment, participating in sprint planning and code reviews to ensure code quality.")
                        .techStack(List.of("React.js", "Spring Boot", "Flutter", "Firebase", "REST APIs"))
                        .achievements(List.of("Developed Travels Website", "Developed Predu Coding"))
                        .build()
        );

        for (Experience exp : experiences) {
            if (experienceRepository.findByTitleIgnoreCaseOrSlugIgnoreCase(exp.getTitle(), exp.getTitle()).isEmpty()) {
                exp.setCreatedAt(LocalDateTime.now());
                experienceRepository.save(exp);
                log.info("Inserted Experience: {}", exp.getTitle());
            }
        }
    }
}
