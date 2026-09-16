<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl w-full max-w-md" style="box-shadow:0 4px 16px 0 rgba(16,24,40,0.15)">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-surface-border">
        <h3 class="font-display font-bold text-gray-900">
          {{ isEdit ? 'Edit Education Level' : 'Add Education Level' }}
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

        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Bachelor's Degree, Master's Degree"
            class="w-full px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            :class="{ 'border-red-400 bg-red-50': errors.name }"
          />
          <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
        </div>

        <!-- Order -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Order</label>
          <input
            v-model.number="form.order"
            type="number"
            min="0"
            placeholder="0"
            class="w-full px-4 py-2.5 text-sm bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 transition"
          />
          <p class="text-xs text-gray-400 mt-1">Lower number = appears first in the list</p>
        </div>

        <!-- Is Active -->
        <div class="flex items-center justify-between py-1">
          <div>
            <p class="text-sm font-semibold text-gray-700">Active</p>
            <p class="text-xs text-gray-400">Inactive levels won't appear in job postings</p>
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
          {{ saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Education Level' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

const props = defineProps({
  item:      { type: Object,  default: null },
  saving:    { type: Boolean, default: false },
  saveError: { type: String,  default: '' },
  totalCount: { type: Number,  default: 0 },
})

const emit = defineEmits(['close', 'saved'])

const isEdit = computed(() => !!props.item?.id)

const form = reactive({
  name:      '',
  order:     0,
  is_active: true,
})

const errors = reactive({ name: '' })

watch(() => props.item, (val) => {
  if (val) {
    form.name      = val.name      ?? ''
    form.order     = val.order     ?? 1
    form.is_active = val.is_active ?? true
  } else {
    form.name      = ''
    form.order = props.totalCount > 0 ? props.totalCount + 1 : 1
    form.is_active = true
  }
}, { immediate: true })

function validate() {
  errors.name = ''
  if (!form.name.trim()) {
    errors.name = 'Education level name is required'
    return false
  }
  return true
}

function handleSubmit() {
  if (!validate()) return
  emit('saved', {
    id:        props.item?.id ?? null,
    name:      form.name.trim(),
    order:     form.order,
    is_active: form.is_active,
  })
}
</script>