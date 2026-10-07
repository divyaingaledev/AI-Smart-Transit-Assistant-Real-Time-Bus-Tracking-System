package com.transit.service;

public interface ETAService {
    int estimateMinutes(Long busId, double destLat, double destLng);
}
