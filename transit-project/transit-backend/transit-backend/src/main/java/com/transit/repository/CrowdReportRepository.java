package com.transit.repository;

import com.transit.entity.CrowdReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrowdReportRepository extends JpaRepository<CrowdReport, Long> {
}
