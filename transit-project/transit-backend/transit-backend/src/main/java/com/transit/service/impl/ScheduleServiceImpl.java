package com.transit.service.impl;

import com.transit.dto.request.CreateScheduleRequest;
import com.transit.entity.Bus;
import com.transit.entity.Route;
import com.transit.entity.Schedule;
import com.transit.repository.BusRepository;
import com.transit.repository.RouteRepository;
import com.transit.repository.ScheduleRepository;
import com.transit.service.ScheduleService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final RouteRepository routeRepository;
    private final BusRepository busRepository;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, RouteRepository routeRepository,
                                BusRepository busRepository) {
        this.scheduleRepository = scheduleRepository;
        this.routeRepository = routeRepository;
        this.busRepository = busRepository;
    }

    @Override
    public List<Schedule> search(String start, String end) {
        return scheduleRepository.findByRoute_StartPointContainingIgnoreCaseAndRoute_EndPointContainingIgnoreCase(start, end);
    }

    @Override
    public Schedule create(CreateScheduleRequest request) {
        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new RuntimeException("Route not found"));
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        Schedule schedule = new Schedule();
        schedule.setRoute(route);
        schedule.setBus(bus);
        schedule.setDepartureTime(request.getDepartureTime());
        schedule.setArrivalTime(request.getArrivalTime());
        return scheduleRepository.save(schedule);
    }

    @Override
    public List<Schedule> listAll() {
        return scheduleRepository.findAll();
    }
}