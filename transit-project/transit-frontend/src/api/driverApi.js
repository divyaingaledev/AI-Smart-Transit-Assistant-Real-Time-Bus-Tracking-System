import axiosClient from "./axiosClient";

export const driverApi = {
  // The logged-in driver's own assigned bus
  myBus: () => axiosClient.get("/driver/my-bus"),
};