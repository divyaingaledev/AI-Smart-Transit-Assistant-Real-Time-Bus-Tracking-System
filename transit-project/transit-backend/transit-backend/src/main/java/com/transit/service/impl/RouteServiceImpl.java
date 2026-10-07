package com.transit.service.impl;

import com.transit.entity.Route;
import com.transit.repository.RouteRepository;
import com.transit.service.RouteService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    public RouteServiceImpl(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    @Override
    public List<Route> search(String start, String end) {
        return routeRepository.findByStartPointContainingIgnoreCaseAndEndPointContainingIgnoreCase(start, end);
    }

    @Override
    public Route create(Route route) {
        return routeRepository.save(route);
    }

    @Override
    public List<Route> listAll() {
        return routeRepository.findAll();
    }
}