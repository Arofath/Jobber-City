import { defineStore } from "pinia";
import { ref } from "vue";
import { adminCompanyApi } from "../api/adminCompany";

export const useAdminCompanyStore = defineStore("adminCompany", () => {
  // ── States ──
  const kpis = ref(null);
  const companyList = ref([]);
  const totalCompanies = ref(0);

  const loadingKpis = ref(false);
  const loadingList = ref(false);
  const loadingAction = ref(false); // សម្រាប់ពេលចុចប៊ូតុង Approve/Reject

  // ── Actions ──
  async function fetchKpis() {
    loadingKpis.value = true;
    try {
      const res = await adminCompanyApi.getKpis();
      kpis.value = res.data.data;
    } catch (error) {
      console.error("Failed to fetch company KPIs:", error);
    } finally {
      loadingKpis.value = false;
    }
  }

  async function fetchCompanies(params = { page: 1, limit: 10 }) {
    loadingList.value = true;
    try {
      const res = await adminCompanyApi.getCompanies(params);
      companyList.value = res.data.data.items;
      totalCompanies.value = res.data.data.total;
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      loadingList.value = false;
    }
  }

  async function updateCompanyStatus(companyId, action) {
    loadingAction.value = true;
    try {
      await adminCompanyApi.updateStatus(companyId, action);
      // បន្ទាប់ពី Update ជោគជ័យ ត្រូវហៅ API ទាញទិន្នន័យថ្មីម្តងទៀត ដើម្បីឱ្យ UI Update
      await fetchKpis();
      await fetchCompanies(); // អាចបញ្ជូន params បច្ចុប្បន្នបើចាំបាច់
      return true;
    } catch (error) {
      console.error(`Failed to ${action} company:`, error);
      return false;
    } finally {
      loadingAction.value = false;
    }
  }

  return {
    kpis,
    companyList,
    totalCompanies,
    loadingKpis,
    loadingList,
    loadingAction,
    fetchKpis,
    fetchCompanies,
    updateCompanyStatus,
  };
});
