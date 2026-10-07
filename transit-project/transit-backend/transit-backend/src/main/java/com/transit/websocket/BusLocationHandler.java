package com.transit.websocket;

import com.transit.dto.request.LocationUpdateRequest;
import com.transit.repository.BusRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller // handles STOMP messages, not regular HTTP
public class BusLocationHandler {

    private final BusRepository busRepository;

    public BusLocationHandler(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    @MessageMapping("/bus-location")  // driver sends to /app/bus-location
    @SendTo("/topic/bus-location")    // broadcast to everyone subscribed
    public LocationUpdateRequest updateLocation(LocationUpdateRequest update) {
        busRepository.findById(update.getBusId()).ifPresent(bus -> {
            bus.setCurrentLat(update.getLat());
            bus.setCurrentLng(update.getLng());
            busRepository.save(bus); // persist last known position
        });
        return update; // forwarded to all subscribed passengers as-is
    }
}