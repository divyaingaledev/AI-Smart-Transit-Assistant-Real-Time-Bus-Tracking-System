
package com.transit.controller;

import com.transit.service.AIAssistantService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final AIAssistantService aiAssistantService;

    public AssistantController(AIAssistantService aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }

    @PostMapping("/ask")
    public String ask(
            @RequestBody String query,
            @RequestHeader(value = "Accept-Language", required = false) String language
    ) {

        if (language == null || language.isBlank()) {
            language = "en";
        }

        // Convert en-IN → en, hi-IN → hi, mr-IN → mr
        if (language.contains("-")) {
            language = language.substring(0, language.indexOf("-"));
        }

        return aiAssistantService.ask(query, language);
    }
}
