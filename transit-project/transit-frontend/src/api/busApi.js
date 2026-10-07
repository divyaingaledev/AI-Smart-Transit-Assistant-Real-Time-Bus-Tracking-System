import axiosClient from "./axiosClient";

export const busApi = {
  listAll: () => axiosClient.get("/buses"),
  reportCrowd: (busId, level) => axiosClient.post(`/buses/${busId}/crowd-report`, null, { params: { level } }),
};
