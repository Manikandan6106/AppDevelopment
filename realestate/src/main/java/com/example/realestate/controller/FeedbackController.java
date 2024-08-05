package com.example.realestate.controller;

import com.example.realestate.model.Feedback;
import com.example.realestate.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.getFeedbackById(id);
        return feedback.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('USER')")
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
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
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        if (!feedbackService.getFeedbackById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
