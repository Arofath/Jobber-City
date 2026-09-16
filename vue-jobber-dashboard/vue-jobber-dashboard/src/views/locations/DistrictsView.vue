<template>
  <div class="space-y-6">

    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <!-- ត្រឡប់ក្រោយ -->
          <router-link to="/admin/master-data/locations" class="text-gray-400 hover:text-brand-600 transition"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg></router-link>
          <h2 class="font-display text-lg font-bold text-gray-900">Districts</h2>
        </div>
        <p class="text-[13px] text-gray-500 mt-0.5 ml-7">Manage districts for a specific province</p>
      </div>
    </div>

    <!-- 🟢 ជ្រើសរើសខេត្ត (Province Selector) -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row items-center gap-4">
      <p class="text-sm font-bold text-gray-700 whitespace-nowrap">Select Province:</p>
      <select v-model="selectedProvinceId" @change="onProvinceChange" class="w-full md:w-64 text-sm border border-surface-border rounded-xl px-4 py-2.5 text-gray-700 bg-surface focus:outline-none focus:ring-2 focus:ring-brand-300 font-medium">
        <option value="">-- Choose Province --</option>
        <option v-for="p in store.provinces" :key="p.id" :value="p.id">{{ p.name_en }} ({{ p.name_km }})</option>
      </select>
    </div>

    <!-- 🟢 KPI Cards សម្រាប់ Districts (បង្ហាញតែពេលជ្រើសរើសខេត្តរួច) -->
    <div v-if="selectedProvinceId" class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
      <div @click="currentTab = 'all'" class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-blue-300" :class="currentTab === 'all' ? 'border-transparent ring-2 ring-blue-500' : 'border-surface-border'">
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Districts</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
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
    <div v-if="selectedProvinceId" class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:flex-1 max-w-xl flex items-center gap-2">
        <div class="relative w-full">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/></svg>
          <input v-model="searchQuery" type="text" placeholder="Search districts..." class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all"/>
        </div>
      </div>
      <button @click="openCreate" class="w-full md:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add District
      </button>
    </div>

    <!-- 🟢 ផ្នែកទី ២: Table -->
    <div v-if="selectedProvinceId" class="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm">
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
             <tr v-if="store.districtsLoading">
                <td colspan="6" class="px-5 py-8 text-center text-gray-400">Loading districts...</td>
             </tr>
            <tr v-else-if="filteredDistricts.length === 0">
              <td colspan="6" class="px-5 py-14 text-center text-gray-400">No districts found for this province.</td>
            </tr>
            <tr v-else v-for="(district, index) in filteredDistricts" :key="district.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-5 py-4 text-gray-400 text-xs font-medium">{{ index + 1 }}</td>
              <td class="px-5 py-4 font-bold text-gray-800">{{ district.name_en }}</td>
              <td class="px-5 py-4 text-gray-600">{{ district.name_km }}</td>
              <td class="px-5 py-4 text-gray-600 font-medium">{{ district.sort_order }}</td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" :class="district.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="district.is_active ? 'bg-emerald-500' : 'bg-gray-400'"></span>
                  {{ district.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openEdit(district)" class="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                  <button @click="handleDeleteClick(district)" :disabled="deletingId === district.id" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <DistrictFormModal v-if="showModal" :district="selectedDistrict" :provinces="store.provinces" :default-province-id="selectedProvinceId" :saving="saving" :save-error="saveError" :total-count="store.districts.length" @close="closeModal" @saved="handleSaved"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocationsStore } from '../../stores/locations.js'
import { toastSuccess, toastError, confirmDelete } from '../../utils/alert.js'
import DistrictFormModal from './DistrictFormModal.vue'

const store = useLocationsStore()
const route = useRoute()

const selectedProvinceId = ref('')
const searchQuery = ref('')
const currentTab  = ref('all')

onMounted(async () => {
  // ១. រង់ចាំឱ្យការទាញយកខេត្តទាំងអស់បញ្ចប់សិន
  await store.fetchProvinces()
  
  // ២. ឆែកមើលថាមានបោះ province_id មកពី URL ឬអត់
  if (route.query.province_id) {
    const queryId = String(route.query.province_id)
    
    // ស្វែងរក ID ខេត្តឱ្យត្រូវគ្នា ១០០% (ដើម្បីការពារការខុសប្រភេទ Number និង String)
    const matchedProvince = store.provinces.find(p => String(p.id) === queryId)
    
    if (matchedProvince) {
      selectedProvinceId.value = matchedProvince.id // កំណត់តម្លៃឱ្យ Dropdown Select
      onProvinceChange() // ហៅ API ទាញយកស្រុកភ្លាមៗ
    }
  }
})

function onProvinceChange() {
  searchQuery.value = ''
  currentTab.value = 'all'
  store.districts = []
  
  if (selectedProvinceId.value) {
    store.fetchDistricts(selectedProvinceId.value)
  }
}

// 🎯 KPI Stats
const stats = computed(() => ({
  total: store.districts.length,
  active: store.districts.filter(d => d.is_active).length,
  inactive: store.districts.filter(d => !d.is_active).length,
}))

// 🎯 Filter
const filteredDistricts = computed(() => {
  return store.districts.filter(d => {
    let matchesTab = true;
    if (currentTab.value === 'active') matchesTab = d.is_active === true;
    if (currentTab.value === 'inactive') matchesTab = d.is_active === false;
    
    const lower = searchQuery.value.toLowerCase();
    const matchesSearch = d.name_en.toLowerCase().includes(lower) || d.name_km.includes(lower);
    
    return matchesTab && matchesSearch;
  });
})

// Modal Logic
const showModal = ref(false)
const selectedDistrict = ref(null)
const saving = ref(false)
const saveError = ref('')
const deletingId = ref(null)

function openCreate() { selectedDistrict.value = null; saveError.value = ''; showModal.value = true; }
function openEdit(district) { selectedDistrict.value = { ...district }; saveError.value = ''; showModal.value = true; }
function closeModal() { if (!saving.value) showModal.value = false; }

async function handleSaved(data) {
  saving.value = true; saveError.value = '';
  try {
    if (data.id) {
      await store.updateDistrict(data.id, data)
      toastSuccess('Updated successfully!')
    } else {
      await store.createDistrict(data)
      toastSuccess('Created successfully!')
    }
    showModal.value = false
  } catch (err) {
    saveError.value = err.response?.data?.message || 'Error occurred.'
  } finally { saving.value = false }
}

async function handleDeleteClick(district) {
  const result = await confirmDelete(district.name_en)
  if (!result.isConfirmed) return
  deletingId.value = district.id
  try {
    await store.removeDistrict(district.id)
    toastSuccess('Deleted successfully!')
  } catch (err) {
    toastError(err.response?.data?.message || 'Delete failed.')
  } finally { deletingId.value = null }
}
</script>