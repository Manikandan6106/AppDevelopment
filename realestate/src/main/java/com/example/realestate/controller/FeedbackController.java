package com.example.realestate.controller;

import com.example.realestate.model.Feedback;
import com.example.realestate.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/getAll")
    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAnyAuthority('USER')")
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN') or hasAnyAuthority('USER')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.getFeedbackById(id);
        return feedback.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
@PreAuthorize("hasAnyAuthority('USER')")
public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
    try {
        Feedback savedFeedback = feedbackService.saveFeedback(feedback);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeedback);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create feedback: " + e.getMessage());
    }
}


    // @PutMapping("/{id}")
    // public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
    //     if (!feedbackService.getFeedbackById(id).isPresent()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     feedback.setId(id);
    //     Feedback updatedFeedback = feedbackService.saveFeedback(feedback);
    //     return ResponseEntity.ok(updatedFeedback);
    // }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN   ')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        if (!feedbackService.getFeedbackById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
