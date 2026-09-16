import axiosInstance from "./axios"; // ផ្លាស់ប្តូរ Path ទៅតាម axios instance របស់លោកអ្នកជាក់ស្តែង

export const adminDashboardApi = {
  // ១. ទាញយកទិន្នន័យ KPI Summary
  getKpiSummary() {
    return axiosInstance.get("/api/admin/dashboard/kpi-summary");
  },

  // ២. ទាញយកទិន្នន័យ Platform Growth (Line Chart)
  getPlatformGrowth(months = 6) {
    return axiosInstance.get("/api/admin/dashboard/growth-chart", {
      params: { months },
    });
  },

  // ៣. ទាញយកទិន្នន័យ Jobs by Category (Donut Chart)
  getJobsByCategory() {
    return axiosInstance.get("/api/admin/dashboard/jobs-by-category");
  },
};
