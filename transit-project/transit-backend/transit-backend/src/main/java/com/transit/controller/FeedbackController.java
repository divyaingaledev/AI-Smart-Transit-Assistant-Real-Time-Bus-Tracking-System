package com.transit.controller;

import com.transit.entity.Feedback;
import com.transit.entity.User;
import com.transit.repository.UserRepository;
import com.transit.service.FeedbackService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final UserRepository userRepository;

    public FeedbackController(FeedbackService feedbackService, UserRepository userRepository) {
        this.feedbackService = feedbackService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Feedback submit(@RequestBody Feedback feedback, @AuthenticationPrincipal UserDetails principal) {
        // The frontend only sends { message } — attach the logged-in user ourselves
        // from the JWT, rather than trusting the client to supply a user id.
        User user = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        feedback.setUser(user);
        return feedbackService.submit(feedback);
    }
}