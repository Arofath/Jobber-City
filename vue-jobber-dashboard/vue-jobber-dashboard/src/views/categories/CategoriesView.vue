<template>
  <div class="space-y-6">

    <!-- Error banner -->
    <div v-if="store.error" class="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 shadow-sm">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/>
      </svg>
      {{ store.error }}
    </div>

    <!-- 🟢 ផ្នែកទី ០: KPI Summary Cards (Clickable Filters) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
      <!-- Card: Total Categories -->
      <div 
        @click="currentTab = 'all'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-blue-300"
        :class="currentTab === 'all' ? 'border-transparent ring-2 ring-blue-500' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Categories</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
      </div>

      <!-- Card: Active -->
      <div 
        @click="currentTab = 'active'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-emerald-300"
        :class="currentTab === 'active' ? 'border-transparent ring-2 ring-emerald-500' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Active</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.active }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <!-- Card: Inactive -->
      <div 
        @click="currentTab = 'inactive'"
        class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-gray-400"
        :class="currentTab === 'inactive' ? 'border-transparent ring-2 ring-gray-400' : 'border-surface-border'"
      >
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inactive</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.inactive }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
           <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 🟢 ផ្នែកទី ១: Header, Search & Create Action -->
    <div class="bg-white rounded-2xl p-5 border border-surface-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div class="relative w-full md:flex-1 max-w-xl flex items-center gap-2">
        <!-- ស្វែងរក -->
        <div class="relative w-full">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search categories..." 
            class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all"
          />
        </div>
        
        <!-- Refresh Button -->
        <button
          @click="loadCategories"
          class="w-10 h-10 shrink-0 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          title="Refresh Data"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': store.loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
        </button>
      </div>

      <!-- ប៊ូតុងបង្កើតថ្មី -->
      <button 
        @click="openCreate"
        class="w-full md:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
        Add Category
      </button>
    </div>

    <!-- 🟢 ផ្នែកទី ២: Table -->
    <div class="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-100">
              <th class="px-5 py-4 w-16">#</th>
              <th class="px-5 py-4">Category</th>
              <th class="px-5 py-4">Icon</th>
              <th class="px-5 py-4">Sort Order</th>
              <th class="px-5 py-4">Status</th>
              <th class="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">

            <!-- Loading skeleton -->
            <template v-if="store.loading">
              <tr v-for="n in 5" :key="n">
                <td class="px-5 py-4"><div class="h-3 w-4 bg-gray-100 rounded animate-pulse"></div></td>
                <td class="px-5 py-4"><div class="h-3 w-28 bg-gray-100 rounded animate-pulse"></div></td>
                <td class="px-5 py-4"><div class="w-8 h-8 bg-gray-100 rounded-lg animate-pulse"></div></td>
                <td class="px-5 py-4"><div class="h-3 w-6 bg-gray-100 rounded animate-pulse"></div></td>
                <td class="px-5 py-4"><div class="h-5 w-14 bg-gray-100 rounded-full animate-pulse"></div></td>
                <td class="px-5 py-4">
                  <div class="flex justify-end gap-2">
                    <div class="w-8 h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div class="w-8 h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                  </div>
                </td>
              </tr>
            </template>

            <!-- Empty state -->
            <tr v-else-if="filteredCategories.length === 0">
              <td colspan="6" class="px-5 py-14 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
                  </svg>
                  <p class="text-sm font-medium text-gray-400">No categories found</p>
                  <p class="text-xs text-gray-300">Try adjusting your search or filters</p>
                </div>
              </td>
            </tr>

            <!-- Rows -->
            <tr
              v-else
              v-for="(cat, index) in filteredCategories"
              :key="cat.id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <td class="px-5 py-4 text-gray-400 text-xs font-medium">{{ index + 1 }}</td>

              <td class="px-5 py-4">
                <span class="font-bold text-gray-800">{{ cat.name }}</span>
              </td>

              <td class="px-5 py-4">
                <div class="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    v-if="cat.icon_url"
                    :src="cat.icon_url"
                    :alt="cat.name"
                    class="w-5 h-5 object-contain"
                    @error="e => e.target.style.display='none'"
                  />
                  <svg v-else class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </td>

              <td class="px-5 py-4 text-gray-600 font-medium">{{ cat.sort_order }}</td>

              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  :class="cat.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500 border border-gray-200'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="cat.is_active ? 'bg-emerald-500' : 'bg-gray-400'"></span>
                  {{ cat.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-2">
                  <!-- Edit button -->
                  <button
                    @click="openEdit(cat)"
                    class="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                    </svg>
                  </button>

                  <!-- Delete button -->
                  <button
                    @click="confirmDelete(cat)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals រក្សាដដែល -->
<!-- Form Modal (create + edit) -->
    <CategoryFormModal
      v-if="showModal"
      :category="selectedCategory"
      :saving="saving"
      :save-error="saveError"
      :total-count="store.categories.length" 
      @close="closeModal"
      @saved="handleSaved"
    />

    <!-- Delete confirm modal (រក្សាដដែលគ្រាន់តែកែ UI តិចតួច) -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div class="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Delete Category</h3>
        <p class="text-[13px] text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to delete <strong class="text-gray-800">{{ categoryToDelete?.name }}</strong>? This action cannot be undone.
        </p>

        <div v-if="deleteError" class="mb-4 px-3 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
          {{ deleteError }}
        </div>

        <div class="flex gap-3">
          <button
            @click="closeDeleteModal"
            :disabled="deleting"
            class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <svg v-if="deleting" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCategoriesStore } from '../../stores/categories.js' // ប្តូរ path តាមតម្រូវការ 
import CategoryFormModal from './CategoryFormModal.vue'

const store = useCategoriesStore()

// 🎯 Filter State
const searchQuery = ref('')
const currentTab  = ref('all') // 'all', 'active', 'inactive'

// ── Load ──────────────────────────────────────────────────
// យើងទាញយកទិន្នន័យទាំងអស់ (Fetch All) នៅពេលបើកទំព័រ ដើម្បីឱ្យកាត KPI អាចរាប់បានពេញលេញ
onMounted(() => loadCategories())

function loadCategories() {
  store.fetchAll() // ហៅ API ដោយមិនបាច់បោះ Parameter (ទាញយកទាំងអស់) 
}

// 🎯 គណនាស្ថិតិសម្រាប់បង្ហាញក្នុង KPI Cards ដោយផ្អែកលើទិន្នន័យដែលទាញបានពី API
const stats = computed(() => {
  return {
    total: store.categories.length,
    active: store.categories.filter(c => c.is_active === true).length,
    inactive: store.categories.filter(c => c.is_active === false).length,
  }
})

// 🎯 Filtering Logic (ដំណើរការលើ Frontend ជួយឱ្យលឿន និងរលូន)
const filteredCategories = computed(() => {
  return store.categories.filter((cat) => {
    // ឆែកមើល Tab Filter
    let matchesTab = true;
    if (currentTab.value === 'active') matchesTab = cat.is_active === true;
    if (currentTab.value === 'inactive') matchesTab = cat.is_active === false;

    // ឆែកមើលការស្វែងរក
    const lowerSearch = searchQuery.value.toLowerCase();
    const matchesSearch = cat.name.toLowerCase().includes(lowerSearch);

    return matchesTab && matchesSearch;
  });
});

// ── Create / Edit / Delete (រក្សាទុក Logic API ចាស់ទាំងអស់) ─────────────────────────────────────────
const showModal        = ref(false)
const selectedCategory = ref(null)
const saving           = ref(false)
const saveError        = ref('')

const showDeleteModal  = ref(false)
const categoryToDelete = ref(null)
const deleting         = ref(false)
const deleteError      = ref('')

function openCreate() {
  selectedCategory.value = null
  saveError.value        = ''
  showModal.value        = true
}

function openEdit(cat) {
  selectedCategory.value = { ...cat }
  saveError.value        = ''
  showModal.value        = true
}

function closeModal() {
  if (saving.value) return
  showModal.value        = false
  selectedCategory.value = null
  saveError.value        = ''
}

async function handleSaved(data) {
  saving.value    = true
  saveError.value = ''
  try {
    if (data.id) {
      await store.update(data.id, { name: data.name, icon_url: data.icon_url, sort_order: data.sort_order, is_active: data.is_active }) 
    } else {
      await store.create({ name: data.name, icon_url: data.icon_url, sort_order: data.sort_order, is_active: data.is_active }) 
    }
    showModal.value = false
  } catch (err) {
    saveError.value = err.response?.data?.message || 'Something went wrong.'
  } finally {
    saving.value = false
  }
}

function confirmDelete(cat) {
  categoryToDelete.value = cat
  deleteError.value      = ''
  showDeleteModal.value  = true
}

function closeDeleteModal() {
  if (deleting.value) return
  showDeleteModal.value  = false
  categoryToDelete.value = null
  deleteError.value      = ''
}

async function handleDelete() {
  deleting.value    = true
  deleteError.value = ''
  try {
    await store.remove(categoryToDelete.value.id) 
    showDeleteModal.value  = false
    categoryToDelete.value = null
  } catch (err) {
    deleteError.value = err.response?.data?.message || 'Failed to delete.'
  } finally {
    deleting.value = false
  }
}
</script>