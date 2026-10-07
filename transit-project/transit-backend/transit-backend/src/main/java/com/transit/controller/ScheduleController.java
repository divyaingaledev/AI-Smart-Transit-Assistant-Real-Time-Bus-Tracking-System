package com.transit.controller;

import com.transit.entity.Schedule;
import com.transit.service.ScheduleService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // Open to any logged-in user — this is what the passenger's "search source/destination" calls
    @GetMapping("/search")
    public List<Schedule> search(@RequestParam String start, @RequestParam String end) {
        return scheduleService.search(start, end);
    }
}