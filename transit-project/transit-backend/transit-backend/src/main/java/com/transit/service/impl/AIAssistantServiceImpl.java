
package com.transit.service.impl;

import com.transit.service.AIAssistantService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AIAssistantServiceImpl implements AIAssistantService {

    @Value("${app.ai.api-key}")
    private String apiKey;

    private final RestClient restClient =
            RestClient.create("https://api.anthropic.com/v1/messages");

    @Override
    public String ask(String query, String language) {

        // Check API key
        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException(
                    "AI API key is missing. Check app.ai.api-key in application.properties"
            );
        }

        // Default language
        if (language == null || language.isBlank()) {
            language = "en";
        }

        String languageInstruction;

        switch (language.toLowerCase()) {
            case "hi":
                languageInstruction =
                        "Answer the user in Hindi. Use simple and clear Hindi.";
                break;

            case "mr":
                languageInstruction =
                        "Answer the user in Marathi. Use simple and clear Marathi.";
                break;

            case "en":
            default:
                languageInstruction =
                        "Answer the user in English. Use simple and clear English.";
                break;
        }

        String prompt =
                "You are a helpful public transport assistant for Pune. "
                        + languageInstruction
                        + " Give practical bus and travel guidance. "
                        + "If you do not know something, clearly say so. "
                        + "\n\nUser question: "
                        + query;

        Map<String, Object> body = Map.of(
                "model", "claude-sonnet-4-6",
                "max_tokens", 500,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );

        Map<String, Object> response = restClient.post()
                .header("x-api-key", apiKey)
                .header("anthropic-version", "2023-06-01")
                .header("Content-Type", "application/json")
                .body(body)
                .retrieve()
                .body(Map.class);

        if (response == null || !response.containsKey("content")) {
            throw new RuntimeException("Invalid response received from AI service.");
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> content =
                (List<Map<String, Object>>) response.get("content");

        if (content == null || content.isEmpty()) {
            throw new RuntimeException("AI returned an empty response.");
        }

        Object text = content.get(0).get("text");

        if (text == null) {
            throw new RuntimeException("AI response does not contain text.");
        }

        return text.toString();
    }
}
