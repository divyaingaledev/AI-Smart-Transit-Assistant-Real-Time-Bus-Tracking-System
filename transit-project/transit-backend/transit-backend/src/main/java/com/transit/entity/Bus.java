package com.transit.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "buses")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String registrationNumber;     // e.g. "MH-12-AB-1234"

    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;                    // the route this bus currently serves

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;                    // the driver assigned to this bus (nullable until assigned)

    private Double currentLat;              // updated live via WebSocket
    private Double currentLng;

    @Enumerated(EnumType.STRING)
    private CrowdLevel crowdLevel = CrowdLevel.UNKNOWN;   // last reported crowd status

    public enum CrowdLevel {
        LOW, MEDIUM, HIGH, UNKNOWN
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public Route getRoute() { return route; }
    public void setRoute(Route route) { this.route = route; }

    public User getDriver() { return driver; }
    public void setDriver(User driver) { this.driver = driver; }

    public Double getCurrentLat() { return currentLat; }
    public void setCurrentLat(Double currentLat) { this.currentLat = currentLat; }

    public Double getCurrentLng() { return currentLng; }
    public void setCurrentLng(Double currentLng) { this.currentLng = currentLng; }

    public CrowdLevel getCrowdLevel() { return crowdLevel; }
    public void setCrowdLevel(CrowdLevel crowdLevel) { this.crowdLevel = crowdLevel; }
}