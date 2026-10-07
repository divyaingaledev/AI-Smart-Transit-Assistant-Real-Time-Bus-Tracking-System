package com.transit.controller;

import com.transit.entity.Bus;
import com.transit.entity.User;
import com.transit.repository.UserRepository;
import com.transit.service.BusTrackingService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/driver")
public class DriverController {

    private final BusTrackingService busTrackingService;
    private final UserRepository userRepository;

    public DriverController(BusTrackingService busTrackingService, UserRepository userRepository) {
        this.busTrackingService = busTrackingService;
        this.userRepository = userRepository;
    }

    // The logged-in driver's own assigned bus — DriverDashboard calls this instead of hardcoding busId
    @GetMapping("/my-bus")
    public Bus myBus(@AuthenticationPrincipal UserDetails principal) {
        User driver = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return busTrackingService.findByDriverId(driver.getId());
    }
}