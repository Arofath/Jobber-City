import { defineStore } from "pinia";
import { ref } from "vue";
import { locationsApi } from "../api/locations.js";

export const useLocationsStore = defineStore("locations", () => {
  const provinces = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchProvinces(params = {}) {
    loading.value = true;
    error.value = null;
    try {
      const res = await locationsApi.getAllProvinces(params);
      provinces.value = res.data.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to load provinces";
    } finally {
      loading.value = false;
    }
  }

  async function createProvince(data) {
    const res = await locationsApi.createProvince(data);
    await fetchProvinces();
    return res.data.data;
  }

  async function updateProvince(id, data) {
    const res = await locationsApi.updateProvince(id, data);
    const index = provinces.value.findIndex((p) => p.id === id);
    if (index !== -1) provinces.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeProvince(id) {
    await locationsApi.removeProvince(id);
    provinces.value = provinces.value.filter((p) => p.id !== id);
  }

  // ── Districts ───────────────────────────────────────────
  const districts = ref([]);
  const districtsLoading = ref(false);
  const districtsError = ref(null);
  const selectedProvinceId = ref("");

  async function fetchDistricts(provinceId, params = {}) {
    if (!provinceId) {
      districts.value = [];
      return;
    }
    districtsLoading.value = true;
    districtsError.value = null;
    selectedProvinceId.value = provinceId;
    try {
      const res = await locationsApi.getDistrictsByProvince(provinceId, params);
      districts.value = res.data.data;
    } catch (err) {
      districtsError.value =
        err.response?.data?.message || "Failed to load districts";
    } finally {
      districtsLoading.value = false;
    }
  }

  async function createDistrict(data) {
    const res = await locationsApi.createDistrict(data);
    // Refresh districts for the current province
    await fetchDistricts(selectedProvinceId.value);
    return res.data.data;
  }

  async function updateDistrict(id, data) {
    const res = await locationsApi.updateDistrict(id, data);
    const index = districts.value.findIndex((d) => d.id === id);
    if (index !== -1) districts.value[index] = res.data.data;
    return res.data.data;
  }

  async function removeDistrict(id) {
    await locationsApi.removeDistrict(id);
    districts.value = districts.value.filter((d) => d.id !== id);
  }

  return {
    // provinces
    provinces,
    loading,
    error,
    fetchProvinces,
    createProvince,
    updateProvince,
    removeProvince,
    // districts
    districts,
    districtsLoading,
    districtsError,
    selectedProvinceId,
    fetchDistricts,
    createDistrict,
    updateDistrict,
    removeDistrict,
  };
});
