package com.transit.service.impl;

import com.transit.repository.BusRepository;
import com.transit.service.ETAService;
import com.transit.util.DistanceCalculator;
import org.springframework.stereotype.Service;

@Service
public class ETAServiceImpl implements ETAService {

    private static final double AVG_SPEED_KMH = 25.0; // rough city-bus average

    private final BusRepository busRepository;

    public ETAServiceImpl(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    @Override
    public int estimateMinutes(Long busId, double destLat, double destLng) {
        var bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        double distanceKm = DistanceCalculator.haversineKm(
                bus.getCurrentLat(), bus.getCurrentLng(), destLat, destLng);

        double hours = distanceKm / AVG_SPEED_KMH;
        return (int) Math.ceil(hours * 60);
    }
}
