package com.example.skillsfusion_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category; // One of 5: Development & IT, Design & Creative, etc.
    private Double budget;
    private String deadline;
    private String clientName;
    private String clientEmail;
    private String contactNumber;


    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public Double getBudget() { return budget; }
    public String getDeadline() { return deadline; }
    public String getClientName() { return clientName; }
    public String getClientEmail() { return clientEmail; }
    public String getContactNumber() { return contactNumber; }

    // --- Setters ---
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCategory(String category) { this.category = category; }
    public void setBudget(Double budget) { this.budget = budget; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
    public void setClientName(String clientName) { this.clientName = clientName; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
}