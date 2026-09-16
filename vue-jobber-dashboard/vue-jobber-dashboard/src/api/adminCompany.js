import axiosInstance from "./axios"; // ផ្លាស់ប្តូរ Path ទៅតាម Project ជាក់ស្តែង

export const adminCompanyApi = {
  // ទាញយក KPI Cards
  getKpis() {
    return axiosInstance.get("/api/admin/companies/kpis");
  },

  // ទាញយកបញ្ជីក្រុមហ៊ុន (អាចបញ្ជូន search, status_filter, page, limit)
  getCompanies(params) {
    return axiosInstance.get("/api/admin/companies/", { params });
  },

  // Approve ឬ Reject ក្រុមហ៊ុន
  updateStatus(companyId, action) {
    return axiosInstance.patch(
      `/api/admin/companies/${companyId}/status`,
      null,
      {
        params: { action },
      },
    );
  },
};
