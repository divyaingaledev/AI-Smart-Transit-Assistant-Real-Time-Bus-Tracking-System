package com.transit.controller;

import com.transit.entity.Route;
import com.transit.service.RouteService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping("/search")
    public List<Route> search(@RequestParam String start, @RequestParam String end) {
        return routeService.search(start, end);
    }

    @PostMapping
    public Route create(@RequestBody Route route) {
        return routeService.create(route);
    }
}
