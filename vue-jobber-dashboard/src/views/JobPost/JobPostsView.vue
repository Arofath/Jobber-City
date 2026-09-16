<template>
  <div class="space-y-6">
    <!-- 🟢 ផ្នែកទី ០: KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      
      <!-- Card: Total Job Posts -->
      <div
        @click="currentTab = 'all'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition-all"
        :class="{'ring-2 ring-blue-500 border-transparent': currentTab === 'all'}"
      >
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Posts</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- Card: Active Posts -->
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

      <!-- Card: Reported -->
      <div
        @click="currentTab = 'reported'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all"
        :class="{'ring-2 ring-amber-500 border-transparent': currentTab === 'reported'}"
      >
        <div>
          <p class="text-xs font-semibold text-amber-500 uppercase tracking-wider">Reported</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.reported }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <!-- Card: Removed -->
      <div
        @click="currentTab = 'removed'"
        class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex items-center justify-between cursor-pointer hover:border-red-300 transition-all"
        :class="{'ring-2 ring-red-500 border-transparent': currentTab === 'removed'}"
      >
        <div>
          <p class="text-xs font-semibold text-red-500 uppercase tracking-wider">Removed</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.removed }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ១: Header & Search/Filter Actions -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <!-- ស្វែងរក Job -->
      <div class="relative w-full md:w-80">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search job title, company..."
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

    <!-- 🟢 ផ្នែកទី ២: Jobs Data Table -->
    <div class="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th class="py-3.5 px-6">Job Details</th>
              <th class="py-3.5 px-4">Company</th>
              <th class="py-3.5 px-4">Posted Date</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="job in filteredJobs" :key="job.id" class="hover:bg-gray-50/50 transition-colors">
              
              <!-- ចំណងជើងការងារ និងប្រភេទ -->
              <td class="py-4 px-6">
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ job.title }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ job.type }} • {{ job.location }}</p>
                </div>
              </td>

              <!-- ក្រុមហ៊ុន -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-600 border border-gray-200 shrink-0">
                    {{ job.company.substring(0, 2).toUpperCase() }}
                  </div>
                  <p class="text-sm font-medium text-gray-800">{{ job.company }}</p>
                </div>
              </td>

              <!-- ថ្ងៃប្រកាស -->
              <td class="py-4 px-4 text-sm text-gray-600">
                {{ job.postedDate }}
              </td>

              <!-- ស្ថានភាព (Status Badge) -->
              <td class="py-4 px-4">
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="{
                    'bg-emerald-50 text-emerald-600 border border-emerald-200': job.status === 'active',
                    'bg-amber-50 text-amber-600 border border-amber-200': job.status === 'reported',
                    'bg-red-50 text-red-600 border border-red-200': job.status === 'removed',
                  }"
                >
                  <span class="w-1.5 h-1.5 rounded-full"
                    :class="{
                      'bg-emerald-500': job.status === 'active',
                      'bg-amber-500': job.status === 'reported',
                      'bg-red-500': job.status === 'removed',
                    }"
                  ></span>
                  {{ capitalize(job.status) }}
                </span>
                <!-- បើគេ Report បង្ហាញមូលហេតុ -->
                <p v-if="job.status === 'reported'" class="text-[10px] text-amber-600 mt-1">Reason: {{ job.reportReason }}</p>
              </td>

              <!-- ប៊ូតុងចាត់វិធានការ (Actions) -->
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2">
                  
                  <!-- ប៊ូតុង Restore (បើលុបហើយ) -->
                  <button
                    v-if="job.status === 'removed'"
                    @click="changeStatus(job.id, 'active')"
                    class="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors"
                  >
                    Restore
                  </button>

                  <!-- ប៊ូតុង Dismiss Report (បើគេ Report តែ Admin ពិនិត្យទៅឃើញធម្មតា) -->
                  <button
                    v-if="job.status === 'reported'"
                    @click="changeStatus(job.id, 'active')"
                    class="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    Dismiss
                  </button>

                  <!-- ប៊ូតុងមើលលម្អិត -->
                  <button
                    @click="viewDetails(job)"
                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <!-- ប៊ូតុង Remove / Take Down (ពណ៌ក្រហម) -->
                   <button
                    v-if="job.status !== 'removed'"
                    @click="changeStatus(job.id, 'removed')"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Remove Job"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ស្ថានភាពគ្មានទិន្នន័យ -->
        <div v-if="filteredJobs.length === 0" class="py-12 text-center">
          <p class="text-sm text-gray-400">No jobs found.</p>
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
  { label: "All Jobs", value: "all" },
  { label: "Active", value: "active" },
  { label: "Reported", value: "reported" },
  { label: "Removed", value: "removed" },
];

const searchQuery = ref("");

// 🎯 ទិន្នន័យគំរូ (Mock Data) សម្រាប់ Jobs
const jobs = ref([
  { id: 1, title: "Senior Flutter Developer", company: "TechBuilder Co.", type: "Full-Time", location: "Phnom Penh", status: "active", postedDate: "2 hours ago" },
  { id: 2, title: "Marketing Manager", company: "Asia Motors Group", type: "Full-Time", location: "Phnom Penh", status: "active", postedDate: "1 day ago" },
  { id: 3, title: "Work from home - Earn $1000", company: "Unknown LLC", type: "Freelance", location: "Remote", status: "reported", reportReason: "Suspected Scam/Fake", postedDate: "2 days ago" },
  { id: 4, title: "Graphic Designer", company: "Creative Studio", type: "Part-Time", location: "Siem Reap", status: "removed", postedDate: "5 days ago" },
  { id: 5, title: "Data Entry Clerk", company: "Fake Shop Loin", type: "Full-Time", location: "Battambang", status: "reported", reportReason: "Discriminatory text", postedDate: "1 week ago" },
]);

// 🎯 គណនាស្ថិតិសម្រាប់បង្ហាញក្នុង KPI Cards
const stats = computed(() => {
  return {
    total: jobs.value.length,
    active: jobs.value.filter((j) => j.status === "active").length,
    reported: jobs.value.filter((j) => j.status === "reported").length,
    removed: jobs.value.filter((j) => j.status === "removed").length,
  };
});

// 🎯 Filtering Logic
const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    const matchesTab = currentTab.value === "all" || job.status === currentTab.value;
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower);
    
    return matchesTab && matchesSearch;
  });
});

// 🎯 អនុគមន៍បំលែងអក្សរតូចទៅជាអក្សរធំដំបូង
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 🎯 មុខងារសម្រាប់ប្តូរ Status (ឧទាហរណ៍ Take down ឬ Restore)
function changeStatus(id, newStatus) {
  const job = jobs.value.find((j) => j.id === id);
  if (job) {
    job.status = newStatus;
  }
}

function viewDetails(job) {
  alert(`Viewing details for Job: ${job.title}`);
}
</script>