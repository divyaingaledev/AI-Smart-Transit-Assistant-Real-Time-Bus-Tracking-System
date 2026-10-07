package com.transit.service;

import com.transit.entity.Route;
import java.util.List;

public interface RouteService {
    List<Route> search(String start, String end);
    Route create(Route route);
    List<Route> listAll();   // used by admin dropdowns
}