package com.example.skillsfusion_backend.controller;
import com.example.skillsfusion_backend.model.Project;
import com.example.skillsfusion_backend.repository.ProjectRepository;
import com.example.skillsfusion_backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ProjectRepository projectRepository;
    @PostMapping("/upload")
    public Project uploadProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @GetMapping
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable String category) {
        List<Project> projects = projectService.getProjectsByCategory(category);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/client/{email}")
    public ResponseEntity<List<Project>> getProjectsByClient(@PathVariable String email) {
        List<Project> projects = projectRepository.findByClientEmail(email);
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/categories")
    public List<String> getCategories() {
        return List.of(
                "Development & IT",
                "Design & Creative",
                "AI Services",
                "Sales & Marketing",
                "Engineering & Architecture"
        );
    }
}