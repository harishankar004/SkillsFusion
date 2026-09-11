package com.example.skillsfusion_backend.controller;

import com.example.skillsfusion_backend.dto.ApplicationRequest;
import com.example.skillsfusion_backend.model.Application;
import com.example.skillsfusion_backend.model.Project;
import com.example.skillsfusion_backend.repository.ApplicationRepository;
import com.example.skillsfusion_backend.repository.ProjectRepository;
import com.example.skillsfusion_backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestBody ApplicationRequest request) {
        try {
            // Log emails
            System.out.println("📧 Freelancer Email: " + request.getEmail());
            System.out.println("📧 Client Email: " + request.getClientEmail());

            // Fetch the project from DB
            Optional<Project> projectOptional = projectRepository.findById(request.getProjectId());
            if (projectOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("❌ Project not found with ID: " + request.getProjectId());
            }

            // Save application to DB
            Application application = new Application();
            application.setFullName(request.getFullName());
            application.setEmail(request.getEmail());
            application.setPhoneNumber(request.getPhoneNumber());
            application.setLinkedIn(request.getLinkedIn());
            application.setGithubLink(request.getGithubLink());
            application.setGithubProject1(request.getGithubProject1());
            application.setGithubProject2(request.getGithubProject2());
            application.setPortfolioLink(request.getPortfolioLink());
            application.setProject(projectOptional.get());

            applicationRepository.save(application);

            // Email to freelancer
            String freelancerMessage = String.format(
                    "Hi %s,\n\nThank you for applying to the freelancing project.\n" +
                            "We have received your application. Please wait for the client to respond.\n\n" +
                            "Best regards,\nSkillsFusion Team",
                    request.getFullName()
            );

            emailService.sendEmail(
                    request.getEmail(),
                    "✅ Application Received - SkillsFusion",
                    freelancerMessage
            );

            // Email to client
            String clientMessage = String.format(
                    "📥 New Freelancer Application Received:\n\n" +
                            "👤 Full Name: %s\n" +
                            "📧 Email: %s\n" +
                            "📱 Phone: %s\n" +
                            "🔗 LinkedIn: %s\n" +
                            "🐙 GitHub: %s\n" +
                            "📁 GitHub Project 1: %s\n" +
                            "📁 GitHub Project 2: %s\n" +
                            "🌐 Portfolio: %s\n",
                    request.getFullName(),
                    request.getEmail(),
                    request.getPhoneNumber(),
                    request.getLinkedIn(),
                    request.getGithubLink(),
                    request.getGithubProject1(),
                    request.getGithubProject2(),
                    request.getPortfolioLink()
            );

            emailService.sendEmail(
                    request.getClientEmail(),
                    "📥 New Freelancer Application - SkillsFusion",
                    clientMessage
            );

            return ResponseEntity.ok("✅ Application submitted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Failed to submit application: " + e.getMessage());
        }
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Project> getProject(@PathVariable Long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/applications/client/{email}")
    public ResponseEntity<List<Application>> getApplicationsByClientEmail(@PathVariable String email) {
        List<Application> apps = applicationRepository.findByProject_ClientEmail(email);
        return ResponseEntity.ok(apps);
    }
    @GetMapping("/applications/freelancer/{email}")
    public ResponseEntity<List<Application>> getApplicationsByFreelancerEmail(@PathVariable String email) {
        List<Application> apps = applicationRepository.findByEmail(email);
        return ResponseEntity.ok(apps);
    }
}
