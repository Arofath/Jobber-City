<template>
  <div class="space-y-6">

    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-display text-lg font-bold text-gray-900">Provinces</h2>
        <p class="text-[13px] text-gray-500 mt-0.5">Manage all provinces and locations</p>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ០: KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
      <div @click="currentTab = 'all'" class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-blue-300" :class="currentTab === 'all' ? 'border-transparent ring-2 ring-blue-500' : 'border-surface-border'">
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Provinces</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
      <div @click="currentTab = 'active'" class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-emerald-300" :class="currentTab === 'active' ? 'border-transparent ring-2 ring-emerald-500' : 'border-surface-border'">
        <div>
          <p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Active</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.active }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
      <div @click="currentTab = 'inactive'" class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-gray-400" :class="currentTab === 'inactive' ? 'border-transparent ring-2 ring-gray-400' : 'border-surface-border'">
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inactive</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.inactive }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ១: Search & Actions -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:flex-1 max-w-xl flex items-center gap-2">
        <div class="relative w-full">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/></svg>
          <input v-model="searchQuery" type="text" placeholder="Search provinces..." class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all"/>
        </div>
        <button
          @click="loadProvinces"
          class="w-10 h-10 shrink-0 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          title="Refresh Data"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': store.loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
        </button>
      </div>
      <button @click="openCreate" class="w-full md:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add Province
      </button>
    </div>

    <!-- 🟢 ផ្នែកទី ២: Table -->
    <div class="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100">
              <th class="px-5 py-4 w-16">#</th>
              <th class="px-5 py-4">Name (EN)</th>
              <th class="px-5 py-4">Name (KM)</th>
              <th class="px-5 py-4">Sort Order</th>
              <th class="px-5 py-4">Status</th>
              <th class="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="filteredProvinces.length === 0">
              <td colspan="6" class="px-5 py-14 text-center text-gray-400">No provinces found.</td>
            </tr>
            <tr v-else v-for="(province, index) in filteredProvinces" :key="province.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-5 py-4 text-gray-400 text-xs font-medium">{{ index + 1 }}</td>
              <td class="px-5 py-4 font-bold text-gray-800">{{ province.name_en }}</td>
              <td class="px-5 py-4 text-gray-600">{{ province.name_km }}</td>
              <td class="px-5 py-4 text-gray-600 font-medium">{{ province.sort_order }}</td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" :class="province.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="province.is_active ? 'bg-emerald-500' : 'bg-gray-400'"></span>
                  {{ province.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-2">
                  <!-- 🎯 ប៊ូតុងរត់ទៅកាន់ Districts (បញ្ជូន ID តាម Query) -->
                  <router-link :to="`/admin/master-data/districts?province_id=${province.id}`" class="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors">
                    Districts
                  </router-link>

                  <button @click="openEdit(province)" class="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                  <button @click="handleDeleteClick(province)" :disabled="deletingId === province.id" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <ProvinceFormModal v-if="showModal" :province="selectedProvince" :saving="saving" :save-error="saveError" :total-count="store.provinces.length" @close="closeModal" @saved="handleSaved"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocationsStore } from '../../stores/locations.js' //[cite: 19, 20]
import { toastSuccess, toastError, confirmDelete } from '../../utils/alert.js' //[cite: 19]
import ProvinceFormModal from './ProvinceFormModal.vue' //[cite: 19]

const store = useLocationsStore()
const searchQuery = ref('')
const currentTab  = ref('all')

onMounted(() => loadProvinces())

function loadProvinces() {
  store.fetchProvinces() //[cite: 20]
}

const stats = computed(() => ({
  total: store.provinces.length,
  active: store.provinces.filter(p => p.is_active).length,
  inactive: store.provinces.filter(p => !p.is_active).length,
}))

const filteredProvinces = computed(() => {
  return store.provinces.filter(p => {
    let matchesTab = true;
    if (currentTab.value === 'active') matchesTab = p.is_active === true;
    if (currentTab.value === 'inactive') matchesTab = p.is_active === false;
    const lower = searchQuery.value.toLowerCase();
    const matchesSearch = p.name_en.toLowerCase().includes(lower) || p.name_km.includes(lower);
    return matchesTab && matchesSearch;
  });
})

// Modal Logic (Same as before)
const showModal = ref(false)
const selectedProvince = ref(null)
const saving = ref(false)
const saveError = ref('')
const deletingId = ref(null)

function openCreate() { selectedProvince.value = null; saveError.value = ''; showModal.value = true; }
function openEdit(province) { selectedProvince.value = { ...province }; saveError.value = ''; showModal.value = true; }
function closeModal() { if (!saving.value) showModal.value = false; }

async function handleSaved(data) {
  saving.value = true; saveError.value = '';
  try {
    if (data.id) {
      await store.updateProvince(data.id, data) //[cite: 20]
      toastSuccess('Updated successfully!')
    } else {
      await store.createProvince(data) //[cite: 20]
      toastSuccess('Created successfully!')
    }
    showModal.value = false
  } catch (err) {
    saveError.value = err.response?.data?.message || 'Error occurred.'
  } finally { saving.value = false }
}

async function handleDeleteClick(province) {
  const result = await confirmDelete(province.name_en)
  if (!result.isConfirmed) return
  deletingId.value = province.id
  try {
    await store.removeProvince(province.id) //[cite: 20]
    toastSuccess('Deleted successfully!')
  } catch (err) {
    toastError(err.response?.data?.message || 'Delete failed.')
  } finally { deletingId.value = null }
}
</script>