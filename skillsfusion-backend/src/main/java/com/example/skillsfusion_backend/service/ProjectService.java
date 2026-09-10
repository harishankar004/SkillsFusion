package com.example.skillsfusion_backend.service;
import com.example.skillsfusion_backend.model.Project;
import com.example.skillsfusion_backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    public List<Project> getProjectsByCategory(String category) {
        return projectRepository.findByCategory(category);
    }
}