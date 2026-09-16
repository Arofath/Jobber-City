import api from "./axios.js";

export const locationsApi = {
  // Provinces
  getAllProvinces(params = {}) {
    return api.get("/api/admin/locations/provinces", { params });
  },
  createProvince(data) {
    return api.post("/api/admin/locations/provinces", data);
  },
  updateProvince(id, data) {
    return api.put(`/api/admin/locations/provinces/${id}`, data);
  },
  removeProvince(id) {
    return api.delete(`/api/admin/locations/provinces/${id}`);
  },

  // ── Districts ───────────────────────────────────────────
  getDistrictsByProvince(provinceId, params = {}) {
    return api.get(`/api/admin/locations/provinces/${provinceId}/districts`, {
      params,
    });
  },
  createDistrict(data) {
    return api.post("/api/admin/locations/districts", data);
  },
  updateDistrict(id, data) {
    return api.put(`/api/admin/locations/districts/${id}`, data);
  },
  removeDistrict(id) {
    return api.delete(`/api/admin/locations/districts/${id}`);
  },
};
