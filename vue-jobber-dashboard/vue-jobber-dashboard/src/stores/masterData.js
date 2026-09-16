import { defineStore } from "pinia";
import { ref } from "vue";
import { masterDataApi } from "../api/masterData.js";

export const useMasterDataStore = defineStore("masterData", () => {
  // ── Job Levels ─────────────────────────────────────────
  const jobLevels = ref([]);
  const jobLevelsLoading = ref(false);
  const jobLevelsError = ref(null);

  async function fetchJobLevels(params = {}) {
    jobLevelsLoading.value = true;
    jobLevelsError.value = null;
    try {
      const res = await masterDataApi.getAllJobLevels(params);
      jobLevels.value = res.data.data;
    } catch (err) {
      jobLevelsError.value =
        err.response?.data?.message || "Failed to load job levels";
    } finally {
      jobLevelsLoading.value = false;
    }
  }

  async function createJobLevel(data) {
    const res = await masterDataApi.createJobLevel(data);
    await fetchJobLevels();
    return res.data.data;
  }

  async function updateJobLevel(id, data) {
    const res = await masterDataApi.updateJobLevel(id, data);
    const index = jobLevels.value.findIndex((j) => j.id === id);
    if (index !== -1) jobLevels.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeJobLevel(id) {
    await masterDataApi.removeJobLevel(id);
    jobLevels.value = jobLevels.value.filter((j) => j.id !== id);
  }

  // ── Education Levels ────────────────────────────────────
  const educationLevels = ref([]);
  const educationLevelsLoading = ref(false);
  const educationLevelsError = ref(null);

  async function fetchEducationLevels(params = {}) {
    educationLevelsLoading.value = true;
    educationLevelsError.value = null;
    try {
      const res = await masterDataApi.getAllEducationLevels(params);
      educationLevels.value = res.data.data;
    } catch (err) {
      educationLevelsError.value =
        err.response?.data?.message || "Failed to load education levels";
    } finally {
      educationLevelsLoading.value = false;
    }
  }

  async function createEducationLevel(data) {
    const res = await masterDataApi.createEducationLevel(data);
    await fetchEducationLevels();
    return res.data.data;
  }

  async function updateEducationLevel(id, data) {
    const res = await masterDataApi.updateEducationLevel(id, data);
    const index = educationLevels.value.findIndex((e) => e.id === id);
    if (index !== -1) educationLevels.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeEducationLevel(id) {
    await masterDataApi.removeEducationLevel(id);
    educationLevels.value = educationLevels.value.filter((e) => e.id !== id);
  }

  // ── Skills ──────────────────────────────────────────────
  const skills = ref([]);
  const skillsLoading = ref(false);
  const skillsError = ref(null);

  async function fetchSkills(params = {}) {
    skillsLoading.value = true;
    skillsError.value = null;
    try {
      const res = await masterDataApi.getAllSkills(params);
      skills.value = res.data.data;
    } catch (err) {
      skillsError.value =
        err.response?.data?.message || "Failed to load skills";
    } finally {
      skillsLoading.value = false;
    }
  }
  async function createSkill(data) {
    const res = await masterDataApi.createSkill(data);
    await fetchSkills();
    return res.data.data;
  }
  async function updateSkill(id, data) {
    const res = await masterDataApi.updateSkill(id, data);
    const index = skills.value.findIndex((s) => s.id === id);
    if (index !== -1) skills.value[index] = res.data.data;
    return res.data.data;
  }
  async function removeSkill(id) {
    await masterDataApi.removeSkill(id);
    skills.value = skills.value.filter((s) => s.id !== id);
  }

  // ── Employment Types ────────────────────────────────────
  const employmentTypes = ref([]);
  const employmentTypesLoading = ref(false);
  const employmentTypesError = ref(null);

  async function fetchEmploymentTypes(params = {}) {
    employmentTypesLoading.value = true;
    employmentTypesError.value = null;
    try {
      const res = await masterDataApi.getAllEmploymentTypes(params);
      employmentTypes.value = res.data.data;
    } catch (err) {
      employmentTypesError.value =
        err.response?.data?.message || "Failed to load employment types";
    } finally {
      employmentTypesLoading.value = false;
    }
  }

  async function createEmploymentType(data) {
    const res = await masterDataApi.createEmploymentType(data);
    await fetchEmploymentTypes();
    return res.data.data;
  }

  async function updateEmploymentType(id, data) {
    const res = await masterDataApi.updateEmploymentType(id, data);
    const index = employmentTypes.value.findIndex((e) => e.id === id);
    if (index !== -1) employmentTypes.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeEmploymentType(id) {
    await masterDataApi.removeEmploymentType(id);
    employmentTypes.value = employmentTypes.value.filter((e) => e.id !== id);
  }

  // ── Work Types ──────────────────────────────────────────
  const workTypes = ref([]);
  const workTypesLoading = ref(false);
  const workTypesError = ref(null);

  async function fetchWorkTypes(params = {}) {
    workTypesLoading.value = true;
    workTypesError.value = null;
    try {
      const res = await masterDataApi.getAllWorkTypes(params);
      workTypes.value = res.data.data;
    } catch (err) {
      workTypesError.value =
        err.response?.data?.message || "Failed to load work types";
    } finally {
      workTypesLoading.value = false;
    }
  }

  async function createWorkType(data) {
    const res = await masterDataApi.createWorkType(data);
    await fetchWorkTypes();
    return res.data.data;
  }

  async function updateWorkType(id, data) {
    const res = await masterDataApi.updateWorkType(id, data);
    const index = workTypes.value.findIndex((w) => w.id === id);
    if (index !== -1) workTypes.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeWorkType(id) {
    await masterDataApi.removeWorkType(id);
    workTypes.value = workTypes.value.filter((w) => w.id !== id);
  }

  // ── Industries ──────────────────────────────────────────
  const industries = ref([]);
  const industriesLoading = ref(false);
  const industriesError = ref(null);

  async function fetchIndustries(params = {}) {
    industriesLoading.value = true;
    industriesError.value = null;
    try {
      const res = await masterDataApi.getAllIndustries(params);
      industries.value = res.data.data;
    } catch (err) {
      industriesError.value =
        err.response?.data?.message || "Failed to load industries";
    } finally {
      industriesLoading.value = false;
    }
  }

  async function createIndustry(data) {
    const res = await masterDataApi.createIndustry(data);
    await fetchIndustries();
    return res.data.data;
  }

  async function updateIndustry(id, data) {
    const res = await masterDataApi.updateIndustry(id, data);
    const index = industries.value.findIndex((i) => i.id === id);
    if (index !== -1) industries.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeIndustry(id) {
    await masterDataApi.removeIndustry(id);
    industries.value = industries.value.filter((i) => i.id !== id);
  }

  return {
    jobLevels,
    jobLevelsLoading,
    jobLevelsError,
    fetchJobLevels,
    createJobLevel,
    updateJobLevel,
    removeJobLevel,
    // education levels
    educationLevels,
    educationLevelsLoading,
    educationLevelsError,
    fetchEducationLevels,
    createEducationLevel,
    updateEducationLevel,
    removeEducationLevel,
    // skills
    skills,
    skillsLoading,
    skillsError,
    fetchSkills,
    createSkill,
    updateSkill,
    removeSkill,

    // employment types
    employmentTypes,
    employmentTypesLoading,
    employmentTypesError,
    fetchEmploymentTypes,
    createEmploymentType,
    updateEmploymentType,
    removeEmploymentType,
    // work types
    workTypes,
    workTypesLoading,
    workTypesError,
    fetchWorkTypes,
    createWorkType,
    updateWorkType,
    removeWorkType,
    // industries
    industries,
    industriesLoading,
    industriesError,
    fetchIndustries,
    createIndustry,
    updateIndustry,
    removeIndustry,
  };
});
