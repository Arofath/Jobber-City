<template>
  <div class="space-y-6">
    <!-- 🟢 ផ្នែកទី ០: KPI Summary Cards (ចម្លងលំនាំពី CompaniesView) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      
      <!-- Card: Total Seekers -->
      <div
        @click="currentTab = 'all'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition-all"
        :class="{'ring-2 ring-blue-500 border-transparent': currentTab === 'all'}"
      >
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Seekers</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
           <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>

      <!-- Card: Active Accounts -->
      <div
        @click="currentTab = 'active'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all"
        :class="{'ring-2 ring-emerald-500 border-transparent': currentTab === 'active'}"
      >
        <div>
          <p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Active</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.active }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Card: Suspended -->
      <div
        @click="currentTab = 'suspended'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all"
        :class="{'ring-2 ring-amber-500 border-transparent': currentTab === 'suspended'}"
      >
        <div>
          <p class="text-xs font-semibold text-amber-500 uppercase tracking-wider">Suspended</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.suspended }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <!-- Card: Banned -->
      <div
        @click="currentTab = 'banned'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-red-300 transition-all"
        :class="{'ring-2 ring-red-500 border-transparent': currentTab === 'banned'}"
      >
        <div>
          <p class="text-xs font-semibold text-red-500 uppercase tracking-wider">Banned</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.banned }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ១: Header & Search/Filter Actions -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <!-- ស្វែងរក Seeker -->
      <div class="relative w-full md:w-80">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search name, email, phone..."
          class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all"
        />
      </div>

      <!-- ត្រងតាម Status -->
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

    <!-- 🟢 ផ្នែកទី ២: Seekers Data Table -->
    <div class="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th class="py-3.5 px-6">Seeker Profile</th>
              <th class="py-3.5 px-4">Contact Info</th>
              <th class="py-3.5 px-4">Applications</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Joined Date</th>
              <th class="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="seeker in filteredSeekers" :key="seeker.id" class="hover:bg-gray-50/50 transition-colors">
              
              <!-- ឈ្មោះ និង Avatar -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                   <img :src="`https://ui-avatars.com/api/?name=${seeker.name.replace(' ', '+')}&background=random`" 
                        class="w-10 h-10 rounded-full border border-gray-200 shrink-0" 
                        alt="avatar" />
                  <div>
                    <p class="text-sm font-bold text-gray-900">{{ seeker.name }}</p>
                    <p class="text-xs text-gray-400">{{ seeker.profession }}</p>
                  </div>
                </div>
              </td>

              <!-- ព័ត៌មានទំនាក់ទំនង -->
              <td class="py-4 px-4">
                <p class="text-sm font-medium text-gray-800">{{ seeker.email }}</p>
                <p class="text-xs text-gray-400">{{ seeker.phone }}</p>
              </td>

              <!-- ចំនួនដែលបានដាក់ពាក្យ -->
              <td class="py-4 px-4 text-sm text-gray-600 font-medium">
                {{ seeker.totalApplications }} <span class="text-xs text-gray-400 font-normal">Jobs</span>
              </td>

              <!-- ស្ថានភាព (Status Badge) -->
              <td class="py-4 px-4">
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="{
                    'bg-emerald-50 text-emerald-600 border border-emerald-200': seeker.status === 'active',
                    'bg-amber-50 text-amber-600 border border-amber-200': seeker.status === 'suspended',
                    'bg-red-50 text-red-600 border border-red-200': seeker.status === 'banned',
                  }"
                >
                   <span class="w-1.5 h-1.5 rounded-full"
                    :class="{
                      'bg-emerald-500': seeker.status === 'active',
                      'bg-amber-500': seeker.status === 'suspended',
                      'bg-red-500': seeker.status === 'banned',
                    }"
                  ></span>
                  {{ capitalize(seeker.status) }}
                </span>
              </td>

              <!-- ថ្ងៃចុះឈ្មោះ -->
              <td class="py-4 px-4 text-sm text-gray-500">
                {{ seeker.date }}
              </td>

              <!-- ប៊ូតុងចាត់វិធានការ (Actions) -->
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2">
                  
                  <!-- ប៊ូតុង Suspend / Activate វិលចុះឡើង -->
                  <button
                    v-if="seeker.status === 'active'"
                    @click="changeStatus(seeker.id, 'suspended')"
                    class="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl text-xs font-bold transition-colors"
                  >
                    Suspend
                  </button>
                  <button
                    v-else-if="seeker.status === 'suspended'"
                    @click="changeStatus(seeker.id, 'active')"
                    class="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors"
                  >
                    Activate
                  </button>

                  <!-- ប៊ូតុងមើលលម្អិត -->
                  <button
                    @click="viewDetails(seeker)"
                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <!-- ប៊ូតុង Ban (ពណ៌ក្រហម) -->
                   <button
                    v-if="seeker.status !== 'banned'"
                    @click="changeStatus(seeker.id, 'banned')"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Ban User"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </button>

                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ស្ថានភាពគ្មានទិន្នន័យ -->
        <div v-if="filteredSeekers.length === 0" class="py-12 text-center">
          <p class="text-sm text-gray-400">No seekers found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// 🎯 Status Tabs
const currentTab = ref("all");
const tabs = [
  { label: "All Seekers", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Banned", value: "banned" },
];

const searchQuery = ref("");

// 🎯 ទិន្នន័យគំរូ (Mock Data) សម្រាប់ Seekers
const seekers = ref([
  { id: 1, name: "Sles Rofath", profession: "Mobile Developer", email: "rofath@gmail.com", phone: "+855 12 345 678", totalApplications: 12, status: "active", date: "24 Aug, 2026" },
  { id: 2, name: "Chea Minea", profession: "UX/UI Designer", email: "minea@gmail.com", phone: "+855 98 765 432", totalApplications: 5, status: "active", date: "20 Aug, 2026" },
  { id: 3, name: "Sok San", profession: "Data Analyst", email: "soksan@gmail.com", phone: "+855 11 222 333", totalApplications: 2, status: "suspended", date: "15 Aug, 2026" },
  { id: 4, name: "Keo Nara", profession: "Unknown", email: "keonara123@gmail.com", phone: "N/A", totalApplications: 10, status: "banned", date: "01 Aug, 2026" },
]);

// 🎯 គណនាស្ថិតិសម្រាប់បង្ហាញក្នុង KPI Cards
const stats = computed(() => {
  return {
    total: seekers.value.length,
    active: seekers.value.filter((s) => s.status === "active").length,
    suspended: seekers.value.filter((s) => s.status === "suspended").length,
    banned: seekers.value.filter((s) => s.status === "banned").length,
  };
});

// 🎯 Filtering Logic
const filteredSeekers = computed(() => {
  return seekers.value.filter((seeker) => {
    const matchesTab = currentTab.value === "all" || seeker.status === currentTab.value;
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch =
      seeker.name.toLowerCase().includes(searchLower) ||
      seeker.email.toLowerCase().includes(searchLower) ||
      seeker.phone.includes(searchLower);
    
    return matchesTab && matchesSearch;
  });
});

// 🎯 អនុគមន៍បំលែងអក្សរតូចទៅជាអក្សរធំដំបូង
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 🎯 មុខងារសម្រាប់ប្តូរ Status
function changeStatus(id, newStatus) {
  const seeker = seekers.value.find((s) => s.id === id);
  if (seeker) {
    seeker.status = newStatus;
  }
}

function viewDetails(seeker) {
  alert(`Viewing details for: ${seeker.name}`);
}
</script>