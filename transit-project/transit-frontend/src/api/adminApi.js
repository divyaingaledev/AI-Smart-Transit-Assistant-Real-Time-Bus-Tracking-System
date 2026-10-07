import axiosClient from "./axiosClient";

export const adminApi = {
  // Buses
  listBuses: () => axiosClient.get("/admin/buses"),
  createBus: (data) => axiosClient.post("/admin/buses", data),       // { registrationNumber, routeId }

  // Routes
  listRoutes: () => axiosClient.get("/admin/routes"),
  createRoute: (data) => axiosClient.post("/admin/routes", data),    // { name, startPoint, endPoint, distanceKm }

  // Schedules (bus timetable)
  listSchedules: () => axiosClient.get("/admin/schedules"),
  createSchedule: (data) => axiosClient.post("/admin/schedules", data), // { routeId, busId, departureTime, arrivalTime }

  // Drivers
  listDrivers: () => axiosClient.get("/admin/drivers"),
  assignDriver: (data) => axiosClient.post("/admin/assign-driver", data), // { busId, driverId }
};