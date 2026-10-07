import axiosClient from "./axiosClient";

export const routeApi = {
  search: (start, end) => axiosClient.get("/routes/search", { params: { start, end } }),
};
