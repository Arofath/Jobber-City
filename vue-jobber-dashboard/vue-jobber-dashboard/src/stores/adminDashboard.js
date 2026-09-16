import { defineStore } from "pinia";
import { ref } from "vue";
import { adminDashboardApi } from "../api/adminDashboard"; // ផ្លាស់ប្តូរ Path បើចាំបាច់

export const useAdminDashboardStore = defineStore("adminDashboard", () => {
  // ── States ──

  // 1. KPI Summary State
  const kpiSummary = ref(null);
  const kpiLoading = ref(false);
  const kpiError = ref(null);

  // 2. Platform Growth State
  const platformGrowth = ref({ categories: [], series: [] });
  const growthLoading = ref(false);
  const growthError = ref(null);

  // 3. Jobs By Category State
  const jobsByCategory = ref({ labels: [], series: [], total_active_jobs: 0 });
  const categoryLoading = ref(false);
  const categoryError = ref(null);

  // ── Actions ──

  async function fetchKpiSummary() {
    kpiLoading.value = true;
    kpiError.value = null;
    try {
      const response = await adminDashboardApi.getKpiSummary();
      kpiSummary.value = response.data.data;
    } catch (error) {
      kpiError.value =
        error.response?.data?.message || "Failed to load KPI summary";
    } finally {
      kpiLoading.value = false;
    }
  }

  async function fetchPlatformGrowth(months = 6) {
    growthLoading.value = true;
    growthError.value = null;
    try {
      const response = await adminDashboardApi.getPlatformGrowth(months);
      platformGrowth.value = response.data.data;
    } catch (error) {
      growthError.value =
        error.response?.data?.message || "Failed to load platform growth";
    } finally {
      growthLoading.value = false;
    }
  }

  async function fetchJobsByCategory() {
    categoryLoading.value = true;
    categoryError.value = null;
    try {
      const response = await adminDashboardApi.getJobsByCategory();
      jobsByCategory.value = response.data.data;
    } catch (error) {
      categoryError.value =
        error.response?.data?.message || "Failed to load jobs by category";
    } finally {
      categoryLoading.value = false;
    }
  }

  // មុខងារសម្រាប់ទាញយកទិន្នន័យទាំងអស់ក្នុងពេលតែមួយ (ស្រេចចិត្ត)
  async function fetchAllDashboardData(months = 6) {
    // ប្រើ Promise.allSettled ដើម្បីឱ្យវាហៅ API ទាំង ៣ ព្រមគ្នា
    await Promise.allSettled([
      fetchKpiSummary(),
      fetchPlatformGrowth(months),
      fetchJobsByCategory(),
    ]);
  }

  return {
    // KPI
    kpiSummary,
    kpiLoading,
    kpiError,
    fetchKpiSummary,

    // Platform Growth
    platformGrowth,
    growthLoading,
    growthError,
    fetchPlatformGrowth,

    // Category Chart
    jobsByCategory,
    categoryLoading,
    categoryError,
    fetchJobsByCategory,

    // All
    fetchAllDashboardData,
  };
});
