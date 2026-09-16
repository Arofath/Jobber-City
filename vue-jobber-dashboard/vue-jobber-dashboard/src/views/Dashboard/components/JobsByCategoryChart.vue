<template>
  <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col h-full relative">
    
    <div v-if="store.categoryLoading" class="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
       <div class="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div class="mb-4">
      <h3 class="text-base font-bold text-gray-900">Jobs By Category</h3>
      <p class="text-[12px] text-gray-500 mt-0.5">Top active categories</p>
    </div>
    
    <div class="flex-1 flex items-center justify-center min-h-70">
      <apexchart 
        v-if="store.jobsByCategory.series.length > 0"
        type="donut" 
        height="320" 
        width="100%"
        :options="chartOptions" 
        :series="store.jobsByCategory.series"
      ></apexchart>
      <!-- បង្ហាញរូបពេលអត់មានទិន្នន័យទាល់តែសោះ -->
      <div v-else-if="!store.categoryLoading" class="text-sm text-gray-400">No data available</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useAdminDashboardStore } from '@/stores/adminDashboard';

const store = useAdminDashboardStore();

// ប្រើប្រាស់ computed សម្រាប់ Options ដើម្បីបញ្ចូល Labels និង Total ថ្មី[cite: 21]
const chartOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'inherit' },
  labels: store.jobsByCategory.labels || [], // 🎯 ទាញចេញពី Store
  colors: ['#4F7DF7', '#8B5CF6', '#10B981', '#F59E0B'],
  plotOptions: {
    pie: {
      donut: {
        size: '72%',
        labels: {
          show: true,
          name: { color: '#6B7280', fontSize: '13px', fontWeight: 500 },
          value: { color: '#111827', fontSize: '24px', fontWeight: 700, formatter: function (val) { return val } },
          total: {
            show: true, showAlways: true, label: 'Total Jobs', color: '#6B7280',
            formatter: function () {
              // 🎯 បង្ហាញចំនួនសរុបចេញពី Store ផ្ទាល់
              return store.jobsByCategory.total_active_jobs || 0; 
            }
          }
        }
      }
    }
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  legend: { position: 'bottom', horizontalAlign: 'center', markers: { radius: 12 }, itemMargin: { horizontal: 10, vertical: 5 } },
  tooltip: { theme: 'light', y: { formatter: function (val) { return val + " posts" } } }
}));
</script>