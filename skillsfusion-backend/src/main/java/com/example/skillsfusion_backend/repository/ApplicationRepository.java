package com.example.skillsfusion_backend.repository;

import com.example.skillsfusion_backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByEmailAndProject_Id(String email, Long projectId);
    List<Application> findByProject_ClientEmail(String clientEmail);
    List<Application> findByEmail(String freelancerEmail);
}
