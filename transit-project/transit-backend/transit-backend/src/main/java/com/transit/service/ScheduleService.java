package com.transit.service;

import com.transit.dto.request.CreateScheduleRequest;
import com.transit.entity.Schedule;
import java.util.List;

public interface ScheduleService {
    List<Schedule> search(String start, String end);   // find timetables between two points
    Schedule create(CreateScheduleRequest request);     // admin: add a new timing
    List<Schedule> listAll();
}