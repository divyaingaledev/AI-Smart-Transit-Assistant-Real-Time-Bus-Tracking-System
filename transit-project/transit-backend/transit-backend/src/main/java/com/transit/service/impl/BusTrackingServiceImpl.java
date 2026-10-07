package com.transit.service.impl;

import com.transit.dto.request.AssignDriverRequest;
import com.transit.dto.request.CreateBusRequest;
import com.transit.entity.Bus;
import com.transit.entity.Route;
import com.transit.entity.User;
import com.transit.exception.ResourceNotFoundException;
import com.transit.repository.BusRepository;
import com.transit.repository.RouteRepository;
import com.transit.repository.UserRepository;
import com.transit.service.BusTrackingService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BusTrackingServiceImpl implements BusTrackingService {

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;
    private final UserRepository userRepository;

    public BusTrackingServiceImpl(BusRepository busRepository, RouteRepository routeRepository,
                                   UserRepository userRepository) {
        this.busRepository = busRepository;
        this.routeRepository = routeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Bus> listAll() {
        return busRepository.findAll();
    }

    @Override
    public Bus reportCrowd(Long busId, Bus.CrowdLevel level) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found"));
        bus.setCrowdLevel(level);
        return busRepository.save(bus);
    }

    @Override
    public Bus create(CreateBusRequest request) {
        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route not found"));

        Bus bus = new Bus();
        bus.setRegistrationNumber(request.getRegistrationNumber());
        bus.setRoute(route);
        return busRepository.save(bus);
    }

    @Override
    public Bus assignDriver(AssignDriverRequest request) {
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found"));
        User driver = userRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));

        if (driver.getRole() != User.Role.DRIVER) {
            throw new IllegalArgumentException("Selected user is not a driver");
        }

        bus.setDriver(driver);
        return busRepository.save(bus);
    }

    @Override
    public Bus findByDriverId(Long driverId) {
        return busRepository.findByDriver_Id(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("No bus assigned to you yet"));
    }
}