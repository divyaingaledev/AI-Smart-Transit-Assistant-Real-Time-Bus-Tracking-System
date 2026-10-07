package com.transit.controller;

import com.transit.service.ETAService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eta")
public class ETAController {

    private final ETAService etaService;

    public ETAController(ETAService etaService) {
        this.etaService = etaService;
    }

    @GetMapping
    public int getEta(@RequestParam Long busId, @RequestParam double lat, @RequestParam double lng) {
        return etaService.estimateMinutes(busId, lat, lng);
    }
}
