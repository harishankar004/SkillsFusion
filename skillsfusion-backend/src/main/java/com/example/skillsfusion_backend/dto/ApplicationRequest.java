package com.example.skillsfusion_backend.dto;

public class ApplicationRequest {

    private String fullName;
    private String email;
    private String phoneNumber;
    private String linkedIn;
    private String githubLink;
    private String githubProject1;
    private String githubProject2;
    private String portfolioLink;
    private String clientEmail;

    private Long projectId; // ✅ This is crucial

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getLinkedIn() { return linkedIn; }
    public void setLinkedIn(String linkedIn) { this.linkedIn = linkedIn; }

    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }

    public String getGithubProject1() { return githubProject1; }
    public void setGithubProject1(String githubProject1) { this.githubProject1 = githubProject1; }

    public String getGithubProject2() { return githubProject2; }
    public void setGithubProject2(String githubProject2) { this.githubProject2 = githubProject2; }

    public String getPortfolioLink() { return portfolioLink; }
    public void setPortfolioLink(String portfolioLink) { this.portfolioLink = portfolioLink; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
}
