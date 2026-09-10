package com.example.skillsfusion_backend.repository;

import com.example.skillsfusion_backend.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.util.List;


public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySenderEmailAndReceiverEmailOrReceiverEmailAndSenderEmail(
            String sender1, String receiver1, String sender2, String receiver2);
}
