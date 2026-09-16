<template>
  <div class="space-y-6">

    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-display text-lg font-bold text-gray-900">Education Levels</h2>
        <p class="text-[13px] text-gray-500 mt-0.5">Manage education / qualification levels</p>
      </div>
    </div>

    <div v-if="store.educationLevelsError" class="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 shadow-sm">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/></svg>
      {{ store.educationLevelsError }}
    </div>

    <!-- 🟢 KPI Cards -->
    <MasterDataKpi 
      title="Education Levels" 
      :data="store.educationLevels" 
      v-model="currentTab" 
    >
      <template #icon>
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
        </svg>
      </template>
    </MasterDataKpi>

    <!-- 🟢 Search & Action -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full md:flex-1 max-w-xl flex items-center gap-2">
        <div class="relative w-full">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/></svg>
          <input v-model="searchQuery" type="text" placeholder="Search education levels..." class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all" />
        </div>
        <button @click="store.fetchEducationLevels()" class="w-10 h-10 shrink-0 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"><svg class="w-4 h-4" :class="{ 'animate-spin': store.educationLevelsLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></button>
      </div>
      <button @click="openCreate" class="w-full md:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add Education
      </button>
    </div>

    <!-- 🟢 Table -->
    <div class="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100">
              <th class="px-5 py-4 w-16">#</th>
              <th class="px-5 py-4">Name</th>
              <th class="px-5 py-4">Order</th>
              <th class="px-5 py-4">Status</th>
              <th class="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <template v-if="store.educationLevelsLoading"><tr v-for="n in 3" :key="n"><td colspan="5" class="px-5 py-4 text-center text-gray-400">Loading...</td></tr></template>
            <tr v-else-if="filteredItems.length === 0"><td colspan="5" class="px-5 py-14 text-center text-gray-400">No education levels found.</td></tr>
            <tr v-else v-for="(item, index) in filteredItems" :key="item.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-5 py-4 text-gray-400 text-xs font-medium">{{ index + 1 }}</td>
              <td class="px-5 py-4 font-bold text-gray-800">{{ item.name }}</td>
              <td class="px-5 py-4"><span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-50 text-brand-600 text-xs font-bold">{{ item.order }}</span></td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" :class="item.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="item.is_active ? 'bg-emerald-500' : 'bg-gray-400'"></span>{{ item.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openEdit(item)" class="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                  <button @click="handleDeleteClick(item)" :disabled="deletingId === item.id" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <EducationLevelFormModal v-if="showModal" :item="selectedItem" :saving="saving" :save-error="saveError" :total-count="store.educationLevels.length" @close="closeModal" @saved="handleSaved"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMasterDataStore } from '../../stores/masterData.js'
import { toastSuccess, toastError, confirmDelete } from '../../utils/alert.js'
import EducationLevelFormModal from './EducationLevelFormModal.vue'
import MasterDataKpi from '../../components/ui/MasterDataKpi.vue'

const store = useMasterDataStore()

const searchQuery = ref('')
const currentTab  = ref('all')
const showModal    = ref(false)
const selectedItem = ref(null)
const saving       = ref(false)
const saveError    = ref('')
const deletingId   = ref(null)

onMounted(() => { store.fetchEducationLevels() })

const filteredItems = computed(() => {
  return store.educationLevels.filter(item => {
    let matchesTab = true;
    if (currentTab.value === 'active') matchesTab = item.is_active === true;
    if (currentTab.value === 'inactive') matchesTab = item.is_active === false;

    const lower = searchQuery.value.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(lower);

    return matchesTab && matchesSearch;
  });
})

function openCreate() { selectedItem.value = null; saveError.value = ''; showModal.value = true; }
function openEdit(item) { selectedItem.value = { ...item }; saveError.value = ''; showModal.value = true; }
function closeModal() { if (!saving.value) showModal.value = false; }

async function handleSaved(data) {
  saving.value = true; saveError.value = '';
  try {
    if (data.id) {
      await store.updateEducationLevel(data.id, data)
      toastSuccess('Updated successfully!')
    } else {
      await store.createEducationLevel(data)
      toastSuccess('Created successfully!')
    }
    showModal.value = false
  } catch (err) {
    saveError.value = err.response?.data?.message || 'Error occurred.'
  } finally { saving.value = false }
}

async function handleDeleteClick(item) {
  const result = await confirmDelete(item.name)
  if (!result.isConfirmed) return
  deletingId.value = item.id
  try {
    await store.removeEducationLevel(item.id)
    toastSuccess('Deleted successfully!')
  } catch (err) {
    toastError(err.response?.data?.message || 'Delete failed.')
  } finally { deletingId.value = null }
}
</script>