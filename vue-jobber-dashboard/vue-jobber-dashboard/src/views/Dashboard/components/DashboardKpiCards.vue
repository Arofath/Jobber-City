<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- បង្ហាញ Loading ពេលកំពុងទាញទិន្នន័យ -->
    <div v-if="store.kpiLoading" v-for="n in 4" :key="'skeleton-'+n" class="bg-white rounded-2xl p-5 border border-surface-border h-33 animate-pulse flex flex-col justify-between">
       <div class="flex justify-between"><div class="w-11 h-11 bg-gray-200 rounded-xl"></div><div class="w-16 h-6 bg-gray-200 rounded-full"></div></div>
       <div><div class="w-20 h-8 bg-gray-200 rounded mt-4"></div><div class="w-24 h-4 bg-gray-200 rounded mt-2"></div></div>
    </div>

    <!-- បង្ហាញទិន្នន័យពិត -->
    <template v-else-if="store.kpiSummary">
      <div v-for="(kpi, index) in dynamicKpiCards" :key="index" class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm hover:shadow-md transition-shadow duration-200 group flex flex-col">
        <div class="flex justify-between items-start">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300" :class="[kpi.bgClass, kpi.textClass]" v-html="kpi.icon"></div>
          
          <div v-if="kpi.trendLabel" class="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full" :class="kpi.trendValue > 0 ? 'bg-green-50 text-green-600' : kpi.trendValue < 0 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'">
            <svg v-if="kpi.trendValue > 0" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M5 12l7-7 7 7"/></svg>
            <svg v-else-if="kpi.trendValue < 0" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12l7 7 7-7"/></svg>
            <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/></svg>
            {{ kpi.trendValue ? Math.abs(kpi.trendValue) + '% ' : '' }}{{ kpi.trendLabel }}
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-3xl font-display font-bold text-gray-900 tracking-tight">{{ kpi.value.toLocaleString() }}</h3>
          <p class="text-[13px] font-medium text-gray-500 mt-1">{{ kpi.title }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminDashboardStore } from '@/stores/adminDashboard';

const store = useAdminDashboardStore();

// រៀបចំទិន្នន័យពី Backend បញ្ចូលគ្នាជាមួយ Icon និងពណ៌[cite: 23]
const dynamicKpiCards = computed(() => {
  if (!store.kpiSummary) return [];
  const data = store.kpiSummary;
  
  return [
    {
      title: 'Total Users',
      value: data.total_users?.value || 0,
      trendValue: data.total_users?.trend,
      trendLabel: data.total_users?.trend_label,
      bgClass: 'bg-blue-50', textClass: 'text-blue-600',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: 'Pending Verifications', 
      value: data.pending_verifications?.value || 0,
      trendValue: data.pending_verifications?.trend,
      trendLabel: data.pending_verifications?.trend_label,
      bgClass: 'bg-amber-50', textClass: 'text-amber-500',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    },
    {
      title: 'Active Jobs',
      value: data.active_jobs?.value || 0,
      trendValue: data.active_jobs?.trend,
      trendLabel: data.active_jobs?.trend_label,
      bgClass: 'bg-green-50', textClass: 'text-green-600',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
    },
    {
      title: 'Total Applications',
      value: data.total_applications?.value || 0,
      trendValue: data.total_applications?.trend,
      trendLabel: data.total_applications?.trend_label,
      bgClass: 'bg-purple-50', textClass: 'text-purple-600',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
    }
  ];
});
</script>