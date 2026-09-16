<template>
  <div class="space-y-6">
    <!-- 🟢 ផ្នែកទី ០: KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <!-- Card: Total Companies -->
      <div
        @click="currentTab = 'all'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition-all"
        :class="{'ring-2 ring-blue-500 border-transparent': currentTab === 'all'}"
      >
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Companies</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">
            {{ store.kpis?.total_companies || 0 }}
          </h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </div>
      </div>

      <!-- Card: Pending Approval -->
      <div
        @click="currentTab = 'pending'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all"
        :class="{'ring-2 ring-amber-500 border-transparent': currentTab === 'pending'}"
      >
        <div>
          <p class="text-xs font-semibold text-amber-500 uppercase tracking-wider">Pending Approval</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">
            {{ store.kpis?.pending_approval || 0 }}
          </h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>

      <!-- Card: Verified -->
      <div
        @click="currentTab = 'verified'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all"
        :class="{'ring-2 ring-emerald-500 border-transparent': currentTab === 'verified'}"
      >
        <div>
          <p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Verified</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">
            {{ store.kpis?.verified || 0 }}
          </h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>

      <!-- Card: Rejected -->
      <div
        @click="currentTab = 'rejected'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-red-300 transition-all"
        :class="{'ring-2 ring-red-500 border-transparent': currentTab === 'rejected'}"
      >
        <div>
          <p class="text-xs font-semibold text-red-500 uppercase tracking-wider">Rejected</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">
            {{ store.kpis?.rejected || 0 }}
          </h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ១: Header & Search/Filter Actions -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:w-80">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
        <input v-model="searchQuery" type="text" placeholder="Search company name, email..." class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all" />
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="currentTab = tab.value"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
          :class="currentTab === tab.value ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ២: Companies Data Table -->
    <div class="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th class="py-3.5 px-6">Company Name</th>
              <th class="py-3.5 px-4">Industry</th>
              <th class="py-3.5 px-4">Owner / Email</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Date Registered</th>
              <th class="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <!-- Loading State -->
            <tr v-if="store.loadingList">
              <td colspan="6" class="py-8 text-center text-sm text-gray-500">
                Loading companies...
              </td>
            </tr>

            <!-- Data Rows -->
            <tr
              v-else
              v-for="company in store.companyList"
              :key="company.company_id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <img v-if="company.logo_url" :src="company.logo_url" class="w-10 h-10 rounded-xl object-cover border border-gray-200" />
                  <div v-else class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 border border-gray-200 shrink-0 uppercase">
                    {{ company.company_name.substring(0, 2) }}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <p class="text-sm font-bold text-gray-900">{{ company.company_name }}</p>
                      <svg v-if="company.is_verified" class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    </div>
                    <p class="text-xs text-gray-400">{{ company.province_id ? 'Has Location' : 'No Location' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-sm text-gray-600">{{ company.industry_name }}</td>
              <td class="py-4 px-4">
                <p class="text-sm font-medium text-gray-800">{{ company.owner_name }}</p>
                <p class="text-xs text-gray-400">{{ company.owner_email }}</p>
              </td>
              <td class="py-4 px-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" :class="{'bg-amber-50 text-amber-600 border border-amber-200': company.status === 'pending', 'bg-blue-50 text-blue-600 border border-blue-200': company.status === 'verified', 'bg-red-50 text-red-600 border border-red-200': company.status === 'rejected'}">
                  <span class="w-1.5 h-1.5 rounded-full" :class="{ 'bg-amber-500': company.status === 'pending', 'bg-blue-500': company.status === 'verified', 'bg-red-500': company.status === 'rejected' }"></span>
                  {{ capitalize(company.status) }}
                </span>
              </td>
              <td class="py-4 px-4 text-sm text-gray-500">{{ formatDate(company.created_at) }}</td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button v-if="company.status === 'pending'" @click="verifyCompany(company.company_id)" :disabled="store.loadingAction" class="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl text-xs font-bold transition-colors disabled:opacity-50">Approve</button>
                  <button @click="viewDetails(company)" class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="View Details"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- No Data State -->
        <div v-if="!store.loadingList && store.companyList.length === 0" class="py-12 text-center">
          <p class="text-sm text-gray-400">No companies found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAdminCompanyStore } from "@/stores/adminCompany";

const store = useAdminCompanyStore();

const currentTab = ref("all");
const tabs = [
  { label: "All Companies", value: "all" },
  { label: "Pending Approval", value: "pending" },
  { label: "Verified", value: "verified" },
  { label: "Rejected", value: "rejected" },
];

const searchQuery = ref("");
let searchTimeout = null;

onMounted(() => {
  store.fetchKpis();
  fetchCompaniesData();
});

function fetchCompaniesData() {
  const params = {
    page: 1,
    limit: 10,
  };
  
  if (currentTab.value !== 'all') {
    params.status_filter = currentTab.value;
  }
  if (searchQuery.value) {
    params.search = searchQuery.value;
  }
  
  store.fetchCompanies(params);
}

watch(currentTab, () => {
  fetchCompaniesData();
});

watch(searchQuery, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchCompaniesData();
  }, 500);
});

async function verifyCompany(companyId) {
  if (confirm("Are you sure you want to approve this company?")) {
    await store.updateCompanyStatus(companyId, "approve");
  }
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric"
  });
}

function viewDetails(company) {
  alert(`Viewing details for: ${company.company_name}`);
}
</script>