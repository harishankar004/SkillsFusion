package com.example.skillsfusion_backend.controller;

import com.example.skillsfusion_backend.model.ChatMessage;
import com.example.skillsfusion_backend.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatRepo;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessage msg) {
        msg.setTimestamp(new Timestamp(System.currentTimeMillis()));
        return ResponseEntity.ok(chatRepo.save(msg));
    }

    @GetMapping("/messages")
    public List<ChatMessage> getMessages(
            @RequestParam String user1, @RequestParam String user2) {
        return chatRepo.findBySenderEmailAndReceiverEmailOrReceiverEmailAndSenderEmail(
                user1, user2, user1, user2);
    }
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send") // client sends to /app/chat.send
    public void sendViaSocket(@Payload ChatMessage msg) {
        msg.setTimestamp(new Timestamp(System.currentTimeMillis()));
        ChatMessage saved = chatRepo.save(msg);

        // delivered ONLY to sessions registered under this exact email
        messagingTemplate.convertAndSendToUser(msg.getReceiverEmail(), "/queue/messages", saved);
        messagingTemplate.convertAndSendToUser(msg.getSenderEmail(), "/queue/messages", saved);
    }
}

