import axiosClient from "./axiosClient";

export const scheduleApi = {
  // Passenger search: "Aundh" -> "Satara" returns matching timetable entries
  search: (start, end) => axiosClient.get("/schedules/search", { params: { start, end } }),
};