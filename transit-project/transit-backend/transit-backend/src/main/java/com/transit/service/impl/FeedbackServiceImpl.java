package com.transit.service.impl;

import com.transit.entity.Feedback;
import com.transit.repository.FeedbackRepository;
import com.transit.service.AIAssistantService;
import com.transit.service.FeedbackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private static final Logger log = LoggerFactory.getLogger(FeedbackServiceImpl.class);

    private final FeedbackRepository feedbackRepository;
    private final AIAssistantService aiAssistantService;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository, AIAssistantService aiAssistantService) {
        this.feedbackRepository = feedbackRepository;
        this.aiAssistantService = aiAssistantService;
    }

    @Override
    public Feedback submit(Feedback feedback) {
        try {
            String prompt = "Classify sentiment as POSITIVE, NEGATIVE or NEUTRAL, one word only: "
                    + feedback.getMessage();
            feedback.setSentiment(aiAssistantService.ask(prompt).trim());
        } catch (Exception e) {
            log.warn("AI sentiment tagging failed, saving feedback without it: {}", e.getMessage());
            feedback.setSentiment("UNTAGGED");
        }
        return feedbackRepository.save(feedback);
    }
}