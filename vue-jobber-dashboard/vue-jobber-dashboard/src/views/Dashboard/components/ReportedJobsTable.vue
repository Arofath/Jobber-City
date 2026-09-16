<template>
  <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col h-full">
    
    <!-- ផ្នែកខាងលើ (Header) -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h3 class="text-base font-bold text-gray-900">Reported Jobs</h3>
        <p class="text-[12px] text-gray-500 mt-0.5">Listings flagged by users</p>
      </div>
      <router-link to="/admin/jobs" class="text-[13px] font-medium text-brand-600 hover:text-brand-700">
        View All
      </router-link>
    </div>

    <!-- ផ្ទៃតារាង (Table) -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-100">
            <th class="py-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Job Title</th>
            <th class="py-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Reason</th>
            <th class="py-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in reportedJobs" :key="job.id" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            
            <td class="py-3 px-2">
              <div>
                <p class="text-[13px] font-bold text-gray-900 truncate max-w-37.5" :title="job.title">{{ job.title }}</p>
                <p class="text-[11px] text-gray-500 truncate max-w-37.5">{{ job.company }}</p>
              </div>
            </td>
            
            <td class="py-3 px-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold"
                    :class="job.severity === 'high' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'">
                {{ job.reason }}
              </span>
            </td>
            
            <td class="py-3 px-2 text-right">
              <div class="flex items-center justify-end gap-2">
                <button class="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="View Details">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Job">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 🎯 ទិន្នន័យគំរូ (Mock Data)
const reportedJobs = ref([
  { id: 1, title: 'Work from home - Easy Money', company: 'Unknown LLC', reason: 'Scam/Fake', severity: 'high' },
  { id: 2, title: 'Data Entry Clerk', company: 'ABC Corp', reason: 'Discriminatory', severity: 'medium' },
  { id: 3, title: 'Graphic Designer', company: 'Creative Studio', reason: 'Inappropriate content', severity: 'medium' },
  { id: 4, title: 'Earn $500/day online', company: 'MakeMoney Fast', reason: 'Scam/Fake', severity: 'high' },
]);
</script>