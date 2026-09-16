<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-6">
    <!-- Card: Total -->
    <div 
      @click="$emit('update:modelValue', 'all')"
      class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-blue-300"
      :class="modelValue === 'all' ? 'border-transparent ring-2 ring-blue-500' : 'border-surface-border'"
    >
      <div>
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total {{ title }}</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ total }}</h3>
      </div>
      <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <slot name="icon">
          <!-- Default Icon -->
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        </slot>
      </div>
    </div>

    <!-- Card: Active -->
    <div 
      @click="$emit('update:modelValue', 'active')"
      class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-emerald-300"
      :class="modelValue === 'active' ? 'border-transparent ring-2 ring-emerald-500' : 'border-surface-border'"
    >
      <div>
        <p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Active</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ activeCount }}</h3>
      </div>
      <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
    </div>

    <!-- Card: Inactive -->
    <div 
      @click="$emit('update:modelValue', 'inactive')"
      class="bg-white rounded-2xl p-5 border shadow-sm flex items-center justify-between cursor-pointer transition-all hover:border-gray-400"
      :class="modelValue === 'inactive' ? 'border-transparent ring-2 ring-gray-400' : 'border-surface-border'"
    >
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inactive</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ inactiveCount }}</h3>
      </div>
      <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
         <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true }, // ឈ្មោះដូចជា 'Skills', 'Job Levels'
  data: { type: Array, required: true }, // ទិន្នន័យសរុបដើម្បីរាប់
  modelValue: { type: String, required: true } // សម្រាប់ v-model (currentTab)
});

defineEmits(['update:modelValue']);

const total = computed(() => props.data.length);
const activeCount = computed(() => props.data.filter(item => item.is_active).length);
const inactiveCount = computed(() => props.data.filter(item => !item.is_active).length);
</script>