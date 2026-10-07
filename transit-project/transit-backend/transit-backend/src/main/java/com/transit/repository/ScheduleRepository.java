package com.transit.repository;

import com.transit.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // Matches schedules whose route's start/end contain the search text (case-insensitive)
    List<Schedule> findByRoute_StartPointContainingIgnoreCaseAndRoute_EndPointContainingIgnoreCase(
            String start, String end);
}