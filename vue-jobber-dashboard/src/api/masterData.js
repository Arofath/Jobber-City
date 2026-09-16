import api from "./axios.js";

export const masterDataApi = {
  // ── Job Levels ─────────────────────────────────────────
  getAllJobLevels(params = {}) {
    return api.get("/api/admin/master-data/job-levels/", { params });
  },
  createJobLevel(data) {
    return api.post("/api/admin/master-data/job-levels/", data);
  },
  updateJobLevel(id, data) {
    return api.put(`/api/admin/master-data/job-levels/${id}`, data);
  },
  removeJobLevel(id) {
    return api.delete(`/api/admin/master-data/job-levels/${id}`);
  },

  // ── Education Levels ────────────────────────────────────
  getAllEducationLevels(params = {}) {
    return api.get("/api/admin/master-data/education-levels/", { params });
  },
  createEducationLevel(data) {
    return api.post("/api/admin/master-data/education-levels/", data);
  },
  updateEducationLevel(id, data) {
    return api.put(`/api/admin/master-data/education-levels/${id}`, data);
  },
  removeEducationLevel(id) {
    return api.delete(`/api/admin/master-data/education-levels/${id}`);
  },

  // ── Skills ──────────────────────────────────────────────
  getAllSkills(params = {}) {
    return api.get("/api/admin/master-data/skills/", { params });
  },
  createSkill(data) {
    return api.post("/api/admin/master-data/skills/", data);
  },
  updateSkill(id, data) {
    return api.put(`/api/admin/master-data/skills/${id}`, data);
  },
  removeSkill(id) {
    return api.delete(`/api/admin/master-data/skills/${id}`);
  },

  // ── Employment Types ────────────────────────────────────
  getAllEmploymentTypes(params = {}) {
    return api.get("/api/admin/master-data/employment-types/", { params });
  },
  createEmploymentType(data) {
    return api.post("/api/admin/master-data/employment-types/", data);
  },
  updateEmploymentType(id, data) {
    return api.put(`/api/admin/master-data/employment-types/${id}`, data);
  },
  removeEmploymentType(id) {
    return api.delete(`/api/admin/master-data/employment-types/${id}`);
  },

  // ── Work Types ──────────────────────────────────────────
  getAllWorkTypes(params = {}) {
    return api.get("/api/admin/master-data/work-types/", { params });
  },
  createWorkType(data) {
    return api.post("/api/admin/master-data/work-types/", data);
  },
  updateWorkType(id, data) {
    return api.put(`/api/admin/master-data/work-types/${id}`, data);
  },
  removeWorkType(id) {
    return api.delete(`/api/admin/master-data/work-types/${id}`);
  },

  // ── Industries ──────────────────────────────────────────
  getAllIndustries(params = {}) {
    return api.get("/api/admin/master-data/industries/", { params });
  },
  createIndustry(data) {
    return api.post("/api/admin/master-data/industries/", data);
  },
  updateIndustry(id, data) {
    return api.put(`/api/admin/master-data/industries/${id}`, data);
  },
  removeIndustry(id) {
    return api.delete(`/api/admin/master-data/industries/${id}`);
  },
};
