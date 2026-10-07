package com.transit.controller;

import com.transit.entity.Bus;
import com.transit.service.BusTrackingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    private final BusTrackingService busTrackingService;

    public BusController(BusTrackingService busTrackingService) {
        this.busTrackingService = busTrackingService;
    }

    @GetMapping
    public List<Bus> listAll() {
        return busTrackingService.listAll();
    }

    @PostMapping("/{id}/crowd-report")
    public Bus reportCrowd(@PathVariable Long id, @RequestParam Bus.CrowdLevel level) {
        return busTrackingService.reportCrowd(id, level);
    }
}
