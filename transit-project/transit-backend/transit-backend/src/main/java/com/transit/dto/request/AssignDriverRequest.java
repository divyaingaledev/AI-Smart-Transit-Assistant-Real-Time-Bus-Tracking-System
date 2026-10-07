package com.transit.dto.request;

public class AssignDriverRequest {
    private Long busId;
    private Long driverId;

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }

    public Long getDriverId() { return driverId; }
    public void setDriverId(Long driverId) { this.driverId = driverId; }
}