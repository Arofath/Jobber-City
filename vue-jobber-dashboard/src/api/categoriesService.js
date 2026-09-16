import api from "./axios.js";

export const categoriesApi = {
  // GET /api/admin/categories/
  getAll(params = {}) {
    return api.get("/api/admin/categories/", { params });
  },

  // POST /api/admin/categories/
  create(data) {
    return api.post("/api/admin/categories/", data);
  },

  update(id, data) {
    return api.put(`/api/admin/categories/${id}`, data);
  },

  remove(id) {
    return api.delete(`/api/admin/categories/${id}`);
  },
};
