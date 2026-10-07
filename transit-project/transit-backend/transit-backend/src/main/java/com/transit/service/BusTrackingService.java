package com.transit.service;

import com.transit.dto.request.AssignDriverRequest;
import com.transit.dto.request.CreateBusRequest;
import com.transit.entity.Bus;
import java.util.List;

public interface BusTrackingService {
    List<Bus> listAll();
    Bus reportCrowd(Long busId, Bus.CrowdLevel level);
    Bus create(CreateBusRequest request);          // admin: register a new bus
    Bus assignDriver(AssignDriverRequest request);  // admin: assign a driver to a bus
    Bus findByDriverId(Long driverId);               // driver: get my assigned bus
}