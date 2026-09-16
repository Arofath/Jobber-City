import axiosInstance from "./axios";

export const adminSeekerApi = {
  // ទាញយក KPI Cards
  getKpis() {
    return axiosInstance.get("/api/admin/seekers/kpis");
  },

  // ទាញយកបញ្ជីអ្នកស្វែងរកការងារ
  getSeekers(params) {
    // 🟢 ថែមសញ្ញា / នៅខាងចុងពាក្យ seekers (seekers/)
    return axiosInstance.get("/api/admin/seekers/", { params });
  },

  // Suspend, Ban, ឬ Activate
  updateStatus(userId, action) {
    return axiosInstance.patch(`/api/admin/seekers/${userId}/status`, null, {
      params: { action },
    });
  },
};
