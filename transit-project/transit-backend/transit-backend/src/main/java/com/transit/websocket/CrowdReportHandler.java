package com.transit.websocket;

import com.transit.entity.Bus;
import com.transit.repository.BusRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CrowdReportHandler {

    private final BusRepository busRepository;

    public CrowdReportHandler(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    @MessageMapping("/crowd-report")
    @SendTo("/topic/crowd-report")
    public Bus report(Bus.CrowdLevel level, Long busId) {
        Bus bus = busRepository.findById(busId).orElseThrow();
        bus.setCrowdLevel(level);
        return busRepository.save(bus);
    }
}
