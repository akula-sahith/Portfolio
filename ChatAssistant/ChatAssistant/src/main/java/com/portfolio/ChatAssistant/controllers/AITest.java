package com.portfolio.ChatAssistant.controllers;

import com.portfolio.ChatAssistant.dto.AIResponse;
import com.portfolio.ChatAssistant.model.Project;
import com.portfolio.ChatAssistant.service.AIService;
import com.portfolio.ChatAssistant.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class AITest {

    private final AIService aiService;
    private final ProjectService projectService;

    @GetMapping("/ans")
    public AIResponse getResponse(@RequestParam String ques){

        return aiService.generateResponse(ques);
    }

//    @GetMapping("/data")
//    public ResponseEntity<Project> getData(@RequestParam String title) {
//
//
//    }

    @GetMapping("/count")
    public long count(){

        return projectService.count();

    }
    @PostMapping("/data")
        public ResponseEntity<Project> saveData(
                @RequestBody Project project
){

            Project savedProject =
                    projectService.saveProject(project);

            System.out.println(
                    "Saved Project ID = "
                            + savedProject.getId()
            );

            return ResponseEntity.ok(savedProject);
        }
}
