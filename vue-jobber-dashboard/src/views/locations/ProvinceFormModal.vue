<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl w-full max-w-md" style="box-shadow:0 4px 16px 0 rgba(16,24,40,0.15)">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-surface-border">
        <h3 class="font-display font-bold text-gray-900">
          {{ isEdit ? 'Edit Province' : 'Add Province' }}
        </h3>
        <button @click="$emit('close')" class="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- API Error -->
      <div v-if="saveError" class="mx-6 mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
        {{ saveError }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">

        <!-- Name EN -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Name (English) <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name_en"
            type="text"
            placeholder="e.g. Phnom Penh"
            class="w-full px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            :class="{ 'border-red-400 bg-red-50': errors.name_en }"
          />
          <p v-if="errors.name_en" class="text-xs text-red-500 mt-1">{{ errors.name_en }}</p>
        </div>

        <!-- Name KM -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Name (Khmer) <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name_km"
            type="text"
            placeholder="e.g. ភ្នំពេញ"
            class="w-full px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            :class="{ 'border-red-400 bg-red-50': errors.name_km }"
          />
          <p v-if="errors.name_km" class="text-xs text-red-500 mt-1">{{ errors.name_km }}</p>
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

        <!-- Is Active -->
        <div class="flex items-center justify-between py-1">
          <div>
            <p class="text-sm font-semibold text-gray-700">Active</p>
            <p class="text-xs text-gray-400">Inactive provinces are hidden from users</p>
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
          {{ saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Province' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const props = defineProps({
  province:   { type: Object,  default: null },
  saving:     { type: Boolean, default: false },
  saveError:  { type: String,  default: '' },
  // 🎯 បន្ថែម Prop ថ្មីសម្រាប់បញ្ជូនចំនួន Province សរុប
  totalCount: { type: Number,  default: 0 },
})

const emit = defineEmits(['close', 'saved'])

const isEdit = computed(() => !!props.province?.id)

const form = reactive({
  name_en:    '',
  name_km:    '',
  sort_order: 1, // លំនាំដើម
  is_active:  true,
})

const errors = reactive({ name_en: '', name_km: '' })

watch(() => props.province, (val) => {
  if (val) {
    form.name_en    = val.name_en    ?? ''
    form.name_km    = val.name_km    ?? ''
    form.sort_order = val.sort_order ?? 1
    form.is_active  = val.is_active  ?? true
  } else {
    form.name_en    = ''
    form.name_km    = ''
    // 🎯 បើជាការបង្កើតថ្មី យកចំនួនសរុប + 1
    form.sort_order = props.totalCount > 0 ? props.totalCount + 1 : 1
    form.is_active  = true
  }
}, { immediate: true })

function validate() {
  errors.name_en = ''
  errors.name_km = ''
  let valid = true

  if (!form.name_en.trim()) {
    errors.name_en = 'English name is required'
    valid = false
  }
  if (!form.name_km.trim()) {
    errors.name_km = 'Khmer name is required'
    valid = false
  }
  return valid
}

function handleSubmit() {
  if (!validate()) return
  emit('saved', {
    id:         props.province?.id ?? null,
    name_en:    form.name_en.trim(),
    name_km:    form.name_km.trim(),
    sort_order: form.sort_order,
    is_active:  form.is_active,
  })
}
</script>