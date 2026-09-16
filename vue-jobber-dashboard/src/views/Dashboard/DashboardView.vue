<template>
  <div class="space-y-6">
    <DashboardKpiCards />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <PlatformGrowthChart class="lg:col-span-2" />
      <JobsByCategoryChart class="lg:col-span-1" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <PendingCompaniesTable />
      <ReportedJobsTable />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminDashboardStore } from '@/stores/adminDashboard'; 

import DashboardKpiCards from './components/DashboardKpiCards.vue';
import PlatformGrowthChart from './components/PlatformGrowthChart.vue';
import JobsByCategoryChart from './components/JobsByCategoryChart.vue';
import PendingCompaniesTable from './components/PendingCompaniesTable.vue';
import ReportedJobsTable from './components/ReportedJobsTable.vue';

const store = useAdminDashboardStore();

onMounted(() => {
  // ហៅទាញយកទិន្នន័យទាំងអស់ពេលទំព័រលោតចេញមក
  store.fetchAllDashboardData(6); 
});
</script>