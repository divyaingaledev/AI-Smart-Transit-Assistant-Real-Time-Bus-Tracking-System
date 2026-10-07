package com.transit.controller;

import com.transit.entity.Trip;
import com.transit.repository.TripRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripRepository tripRepository;

    public TripController(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @PostMapping("/{id}/start")
    public Trip start(@PathVariable Long id) {
        Trip trip = tripRepository.findById(id).orElseThrow();
        trip.setStatus(Trip.Status.IN_PROGRESS);
        trip.setStartedAt(LocalDateTime.now());
        return tripRepository.save(trip);
    }

    @PostMapping("/{id}/end")
    public Trip end(@PathVariable Long id) {
        Trip trip = tripRepository.findById(id).orElseThrow();
        trip.setStatus(Trip.Status.COMPLETED);
        trip.setEndedAt(LocalDateTime.now());
        return tripRepository.save(trip);
    }
}
