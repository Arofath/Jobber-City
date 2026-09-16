<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl w-full max-w-md" style="box-shadow:0 4px 16px 0 rgba(16,24,40,0.15)">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-surface-border">
        <h3 class="font-display font-bold text-gray-900">
          {{ isEdit ? 'Edit Category' : 'Add Category' }}
        </h3>
        <button @click="$emit('close')" class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- API error -->
      <div v-if="saveError" class="mx-6 mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
        {{ saveError }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">

        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Category Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Technology"
            class="w-full px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            :class="{ 'border-red-400 bg-red-50': errors.name }"
          />
          <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
        </div>

        <!-- Icon URL -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Icon URL</label>
          <div class="flex items-center gap-3">
            <input
              v-model="form.icon_url"
              type="url"
              placeholder="https://example.com/icon.png"
              class="flex-1 px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition"
            />
            <div class="w-10 h-10 rounded-xl border border-surface-border bg-surface flex items-center justify-center shrink-0 overflow-hidden">
              <img
                v-if="form.icon_url"
                :src="form.icon_url"
                class="w-6 h-6 object-contain"
                @error="e => e.target.style.display='none'"
              />
              <svg v-else class="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-1">Preview updates automatically as you type</p>
        </div>

        <!-- Sort Order -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Sort Order</label>
          <input
            v-model.number="form.sort_order"
            type="number"
            min="0"
            placeholder="99"
            class="w-full px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition"
          />
          <p class="text-xs text-gray-400 mt-1">Lower number = appears first</p>
        </div>

        <!-- Is Active toggle -->
        <div class="flex items-center justify-between py-1">
          <div>
            <p class="text-sm font-semibold text-gray-700">Active</p>
            <p class="text-xs text-gray-400">Inactive categories are hidden from users</p>
          </div>
          <button
            type="button"
            @click="form.is_active = !form.is_active"
            class="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
            :class="form.is_active ? 'bg-brand-600' : 'bg-gray-200'"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              :class="form.is_active ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </button>
        </div>

      </form>

      <!-- Footer -->
      <div class="flex items-center gap-3 px-6 py-4 border-t border-surface-border">
        <button
          type="button"
          @click="$emit('close')"
          :disabled="saving"
          class="flex-1 py-2.5 border border-surface-border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="saving"
          class="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Category' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  category:   { type: Object,  default: null },
  saving:     { type: Boolean, default: false },
  saveError:  { type: String,  default: '' },
  // 🎯 បន្ថែម Prop ថ្មីសម្រាប់បញ្ជូនចំនួន Category សរុប
  totalCount: { type: Number,  default: 0 },
})

const emit = defineEmits(['close', 'saved'])

const isEdit = computed(() => !!props.category?.id)

const form = reactive({
  name:       '',
  icon_url:   '',
  sort_order: 1, // លំនាំដើម
  is_active:  true,
})

const errors = reactive({ name: '' })

watch(() => props.category, (val) => {
  if (val) {
    form.name       = val.name       ?? ''
    form.icon_url   = val.icon_url   ?? ''
    form.sort_order = val.sort_order ?? 1
    form.is_active  = val.is_active  ?? true
  } else {
    // 🎯 បើជាការបង្កើតថ្មី (Add Category) យកចំនួនសរុប + 1
    form.name       = ''
    form.icon_url   = ''
    form.sort_order = props.totalCount > 0 ? props.totalCount + 1 : 1
    form.is_active  = true
  }
}, { immediate: true })

function validate() {
  errors.name = ''
  if (!form.name.trim()) {
    errors.name = 'Category name is required'
    return false
  }
  return true
}

function handleSubmit() {
  if (!validate()) return
  emit('saved', {
    id:         props.category?.id ?? null,
    name:       form.name.trim(),
    icon_url:   form.icon_url.trim(),
    sort_order: form.sort_order,
    is_active:  form.is_active,
  })
}
</script>