package com.transit.repository;

import com.transit.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByStartPointContainingIgnoreCaseAndEndPointContainingIgnoreCase(String start, String end);
}
