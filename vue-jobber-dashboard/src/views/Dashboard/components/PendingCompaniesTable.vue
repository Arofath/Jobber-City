<template>
  <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col h-full">
    
    <!-- ផ្នែកខាងលើ (Header) -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h3 class="text-base font-bold text-gray-900">Pending Companies</h3>
        <p class="text-[12px] text-gray-500 mt-0.5">Companies waiting for verification</p>
      </div>
      <router-link to="/admin/companies" class="text-[13px] font-medium text-brand-600 hover:text-brand-700">
        View All
      </router-link>
    </div>

    <!-- ផ្ទៃតារាង (Table) -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-100">
            <th class="py-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Company Info</th>
            <th class="py-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date Applied</th>
            <th class="py-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companies" :key="company.id" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            
            <td class="py-3 px-2">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                  <span class="text-xs font-bold text-gray-500">{{ company.logo }}</span>
                </div>
                <div>
                  <p class="text-[13px] font-bold text-gray-900">{{ company.name }}</p>
                  <p class="text-[11px] text-gray-500">{{ company.industry }}</p>
                </div>
              </div>
            </td>
            
            <td class="py-3 px-2 text-[13px] text-gray-600">
              {{ company.date }}
            </td>
            
            <td class="py-3 px-2 text-right">
              <button class="px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-[12px] font-semibold transition-colors">
                Review
              </button>
            </td>
            
          </tr>
        </tbody>
      </table>
      
      <!-- បង្ហាញពេលគ្មានទិន្នន័យ -->
      <div v-if="companies.length === 0" class="py-8 text-center">
        <p class="text-sm text-gray-500">No pending companies.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 🎯 ទិន្នន័យគំរូ (Mock Data)
const companies = ref([
  { id: 1, logo: 'TB', name: 'TechBuilder Co.', industry: 'Technology', date: 'Just now' },
  { id: 2, logo: 'FK', name: 'FoodKhmer', industry: 'Food & Beverage', date: '2 hours ago' },
  { id: 3, logo: 'AM', name: 'Asia Motors', industry: 'Automotive', date: 'Yesterday' },
  { id: 4, logo: 'GL', name: 'Global Logistics', industry: 'Logistics', date: 'Aug 22, 2026' },
]);
</script>