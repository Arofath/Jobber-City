import { defineStore } from "pinia";
import { ref } from "vue";
import { adminSeekerApi } from "../api/adminSeeker";

export const useAdminSeekerStore = defineStore("adminSeeker", () => {
  // ── States ──
  const kpis = ref(null);
  const seekerList = ref([]);
  const totalSeekers = ref(0);

  const loadingKpis = ref(false);
  const loadingList = ref(false);
  const loadingAction = ref(false);

  // ── Actions ──
  async function fetchKpis() {
    loadingKpis.value = true;
    try {
      const res = await adminSeekerApi.getKpis();
      kpis.value = res.data.data;
    } catch (error) {
      console.error("Failed to fetch seeker KPIs:", error);
    } finally {
      loadingKpis.value = false;
    }
  }

  async function fetchSeekers(params = { page: 1, limit: 10 }) {
    loadingList.value = true;
    try {
      const res = await adminSeekerApi.getSeekers(params);
      seekerList.value = res.data.data.items;
      totalSeekers.value = res.data.data.total;
    } catch (error) {
      console.error("Failed to fetch seekers:", error);
    } finally {
      loadingList.value = false;
    }
  }

  async function updateSeekerStatus(userId, action) {
    loadingAction.value = true;
    try {
      await adminSeekerApi.updateStatus(userId, action);
      // Refresh ទិន្នន័យ
      await fetchKpis();
      await fetchSeekers();
      return true;
    } catch (error) {
      console.error(`Failed to ${action} seeker:`, error);
      return false;
    } finally {
      loadingAction.value = false;
    }
  }

  return {
    kpis,
    seekerList,
    totalSeekers,
    loadingKpis,
    loadingList,
    loadingAction,
    fetchKpis,
    fetchSeekers,
    updateSeekerStatus,
  };
});
