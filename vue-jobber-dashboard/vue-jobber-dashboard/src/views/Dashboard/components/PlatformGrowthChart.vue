<template>
  <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col h-full relative">
    
    <div v-if="store.growthLoading" class="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
       <div class="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div class="flex justify-between items-center mb-2">
      <div>
        <h3 class="text-base font-bold text-gray-900">Platform Growth</h3>
        <p class="text-[12px] text-gray-500 mt-0.5">Seekers vs Employers over time</p>
      </div>
      <select @change="handlePeriodChange" class="text-[13px] border border-gray-200 rounded-lg text-gray-600 bg-gray-50 py-1.5 px-3 outline-none hover:bg-gray-100 cursor-pointer transition-colors">
        <option value="6">Last 6 Months</option>
        <option value="12">Last 12 Months</option>
      </select>
    </div>

    <div class="flex-1 min-h-70 w-full mt-4">
      <apexchart 
        v-if="store.platformGrowth.series.length > 0"
        type="area" 
        height="100%" 
        width="100%" 
        :options="chartOptions" 
        :series="store.platformGrowth.series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useAdminDashboardStore } from '@/stores/adminDashboard';

const store = useAdminDashboardStore();

// ចាប់យក Event ពេលជ្រើសរើសខែ
function handlePeriodChange(event) {
  store.fetchPlatformGrowth(parseInt(event.target.value));
}

// ប្រើប្រាស់ computed សម្រាប់ Options ដើម្បីឱ្យវារត់ Categories ថ្មីពេលមានទិន្នន័យថ្មីពី Backend[cite: 22]
const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    fontFamily: 'inherit',
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  colors: ['#4F7DF7', '#10B981'],
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2.5 },
  xaxis: {
    categories: store.platformGrowth.categories || [], // 🎯 ទាញចេញពី Store
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#9CA3AF', fontSize: '12px' } }
  },
  yaxis: { labels: { style: { colors: '#9CA3AF', fontSize: '12px' } } },
  grid: {
    borderColor: '#F3F4F6', strokeDashArray: 4,
    xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } },
    padding: { top: 0, right: 0, bottom: 0, left: 10 }
  },
  legend: { position: 'top', horizontalAlign: 'right', markers: { radius: 12 }, itemMargin: { horizontal: 10 } },
  tooltip: { theme: 'light', y: { formatter: function (val) { return val + " users" } } }
}));
</script>