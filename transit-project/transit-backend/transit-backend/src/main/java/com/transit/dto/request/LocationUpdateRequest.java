package com.transit.dto.request;

// Sent by driver's app every few seconds over WebSocket
public class LocationUpdateRequest {
    private Long busId;
    private Double lat;
    private Double lng;

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }
    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }
    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }
}