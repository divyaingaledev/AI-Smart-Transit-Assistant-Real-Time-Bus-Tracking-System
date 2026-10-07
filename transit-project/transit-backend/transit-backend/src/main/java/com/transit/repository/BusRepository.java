package com.transit.repository;

import com.transit.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BusRepository extends JpaRepository<Bus, Long> {
    Optional<Bus> findByDriver_Id(Long driverId);   // find the bus assigned to a given driver
}