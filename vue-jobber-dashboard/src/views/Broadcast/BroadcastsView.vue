<template>
  <div class="space-y-6">
    <!-- 🟢 ផ្នែកទី ០: KPI Summary Cards (អាចចុចបានដើម្បី Filter) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      
      <!-- Card: Total Broadcasts (All) -->
      <div 
        @click="currentTab = 'all'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-blue-300"
        :class="currentTab === 'all' ? 'border-transparent ring-2 ring-blue-500' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Broadcasts</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
      </div>

      <!-- Card: Sent This Month -->
      <div 
        @click="currentTab = 'sent'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-emerald-300"
        :class="currentTab === 'sent' ? 'border-transparent ring-2 ring-emerald-500' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Sent (This Month)</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.sent }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>

      <!-- Card: Scheduled -->
      <div 
        @click="currentTab = 'scheduled'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-amber-300"
        :class="currentTab === 'scheduled' ? 'border-transparent ring-2 ring-amber-500' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-amber-500 uppercase tracking-wider">Scheduled</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.scheduled }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Card: Drafts -->
      <div 
        @click="currentTab = 'draft'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-gray-400"
        :class="currentTab === 'draft' ? 'border-transparent ring-2 ring-gray-400' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Drafts</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.drafts }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ១: Header, Search & Create Action -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      
      <!-- ស្វែងរក Broadcast -->
      <div class="relative w-full md:flex-1 max-w-xl">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
        </svg>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search subject or message..." 
          class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all"
        />
      </div>

      <!-- ប៊ូតុងបង្កើត Broadcast ថ្មី -->
      <button 
        @click="openCreateModal"
        class="w-full md:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Broadcast
      </button>
    </div>

    <!-- 🟢 ផ្នែកទី ២: Broadcasts Data Table -->
    <div class="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th class="py-3.5 px-6">Message Subject</th>
              <th class="py-3.5 px-4">Target Audience</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Date / Time</th>
              <th class="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="msg in filteredBroadcasts" :key="msg.id" class="hover:bg-gray-50/50 transition-colors">
              
              <!-- ចំណងជើងសារ -->
              <td class="py-4 px-6">
                <div class="max-w-62.5">
                  <p class="text-sm font-bold text-gray-900 truncate" :title="msg.subject">{{ msg.subject }}</p>
                  <p class="text-xs text-gray-500 truncate mt-0.5" :title="msg.content">{{ msg.content }}</p>
                </div>
              </td>

              <!-- គោលដៅអ្នកទទួល -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                  <svg v-if="msg.audience === 'All Users'" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else-if="msg.audience === 'Seekers Only'" class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ msg.audience }}
                </div>
              </td>

              <!-- ស្ថានភាព -->
              <td class="py-4 px-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  :class="{
                    'bg-emerald-50 text-emerald-600 border border-emerald-200': msg.status === 'sent',
                    'bg-amber-50 text-amber-600 border border-amber-200': msg.status === 'scheduled',
                    'bg-gray-100 text-gray-600 border border-gray-200': msg.status === 'draft'
                  }"
                >
                  {{ capitalize(msg.status) }}
                </span>
              </td>

              <!-- កាលបរិច្ឆេទ -->
              <td class="py-4 px-4 text-sm text-gray-500">
                {{ msg.date }}
              </td>

              <!-- ប៊ូតុងចាត់វិធានការ -->
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2">
                  
                  <!-- ប៊ូតុង Send សម្រាប់ Drafts ឫ Scheduled -->
                  <button 
                    v-if="msg.status !== 'sent'"
                    @click="sendNow(msg.id)"
                    class="p-2 text-brand-600 hover:bg-brand-50 rounded-xl transition-colors" 
                    title="Send Now"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>

                  <!-- ប៊ូតុងមើលលម្អិត / កែប្រែ -->
                  <button 
                    class="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors" 
                    title="View / Edit"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  
                  <!-- ប៊ូតុងលុប -->
                  <button 
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" 
                    title="Delete"
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
        <div v-if="filteredBroadcasts.length === 0" class="py-12 text-center">
          <p class="text-sm text-gray-400">No broadcasts found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const currentTab = ref('all'); // 🎯 បន្ថែម State សម្រាប់ផ្ទុក Tab ដែលកំពុងរើស

// 🎯 ទិន្នន័យគំរូ (Mock Data)
const broadcasts = ref([
  { id: 1, subject: 'System Maintenance Notice', content: 'Our platform will be down for 2 hours this Sunday.', audience: 'All Users', status: 'scheduled', date: 'Aug 30, 2026 | 02:00 AM' },
  { id: 2, subject: 'New Feature: Video Resumes', content: 'Job seekers can now upload video resumes!', audience: 'Seekers Only', status: 'sent', date: 'Aug 20, 2026 | 10:00 AM' },
  { id: 3, subject: '50% Off Premium Job Posts', content: 'Special promotion for employers this month.', audience: 'Employers Only', status: 'sent', date: 'Aug 01, 2026 | 09:00 AM' },
  { id: 4, subject: 'Holiday Greeting', content: 'Wishing everyone a happy upcoming holiday.', audience: 'All Users', status: 'draft', date: 'Last edited: Today' },
]);

// 🎯 គណនាស្ថិតិ
const stats = computed(() => {
  return {
    total: broadcasts.value.length,
    sent: broadcasts.value.filter((b) => b.status === 'sent').length,
    scheduled: broadcasts.value.filter((b) => b.status === 'scheduled').length,
    drafts: broadcasts.value.filter((b) => b.status === 'draft').length,
  };
});

// 🎯 Filtering (គួបផ្សំរវាង Tab ដែលចុចលើកាត នឹងការវាយស្វែងរក)
const filteredBroadcasts = computed(() => {
  return broadcasts.value.filter((b) => {
    // ឆែកមើល Tab (បើ all គឺយកទាំងអស់ បើមិនអញ្ចឹងយកតែ status ត្រូវគ្នា)
    const matchesTab = currentTab.value === 'all' || b.status === currentTab.value;
    
    // ឆែកមើលការស្វែងរក
    const lower = searchQuery.value.toLowerCase();
    const matchesSearch = b.subject.toLowerCase().includes(lower) || b.content.toLowerCase().includes(lower);
    
    return matchesTab && matchesSearch;
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function openCreateModal() {
  alert("Open Create Broadcast Modal/Page");
}

function sendNow(id) {
  const msg = broadcasts.value.find(b => b.id === id);
  if (msg) {
    msg.status = 'sent';
    msg.date = 'Just now';
  }
}
</script>