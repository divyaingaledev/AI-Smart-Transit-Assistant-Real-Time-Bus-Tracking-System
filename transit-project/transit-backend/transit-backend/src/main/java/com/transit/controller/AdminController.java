package com.transit.controller;

import com.transit.dto.request.AssignDriverRequest;
import com.transit.dto.request.CreateBusRequest;
import com.transit.dto.request.CreateScheduleRequest;
import com.transit.entity.Bus;
import com.transit.entity.Route;
import com.transit.entity.Schedule;
import com.transit.entity.User;
import com.transit.repository.UserRepository;
import com.transit.service.BusTrackingService;
import com.transit.service.RouteService;
import com.transit.service.ScheduleService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Everything here is already locked to ADMIN role by SecurityConfig's "/api/admin/**" rule
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BusTrackingService busTrackingService;
    private final RouteService routeService;
    private final ScheduleService scheduleService;
    private final UserRepository userRepository;

    public AdminController(BusTrackingService busTrackingService, RouteService routeService,
                            ScheduleService scheduleService, UserRepository userRepository) {
        this.busTrackingService = busTrackingService;
        this.routeService = routeService;
        this.scheduleService = scheduleService;
        this.userRepository = userRepository;
    }

    // ---- Buses ----
    @GetMapping("/buses")
    public List<Bus> listAllBuses() {
        return busTrackingService.listAll();
    }

    @PostMapping("/buses")
    public Bus createBus(@RequestBody CreateBusRequest request) {
        return busTrackingService.create(request);
    }

    // ---- Routes ----
    @GetMapping("/routes")
    public List<Route> listAllRoutes() {
        return routeService.listAll();
    }

    @PostMapping("/routes")
    public Route createRoute(@RequestBody Route route) {
        return routeService.create(route);
    }

    // ---- Schedules (bus timetable) ----
    @GetMapping("/schedules")
    public List<Schedule> listAllSchedules() {
        return scheduleService.listAll();
    }

    @PostMapping("/schedules")
    public Schedule createSchedule(@RequestBody CreateScheduleRequest request) {
        return scheduleService.create(request);
    }

    // ---- Drivers ----
    @GetMapping("/drivers")
    public List<User> listDrivers() {
        return userRepository.findByRole(User.Role.DRIVER);
    }

    @PostMapping("/assign-driver")
    public Bus assignDriver(@RequestBody AssignDriverRequest request) {
        return busTrackingService.assignDriver(request);
    }
}