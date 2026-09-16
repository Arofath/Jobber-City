<template>
  <div class="flex flex-col items-center justify-center h-64 text-center">
    <div class="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
      <svg class="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
      </svg>
    </div>
    <h2 class="font-display text-lg font-bold text-gray-800 mb-1">{{ route.meta?.title }}</h2>
    <p class="text-sm text-gray-400">This page is coming soon.</p>
    <router-link :to="backRoute" class="mt-5 text-sm text-brand-600 font-semibold hover:underline">← Back to Dashboard</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route     = useRoute()
const backRoute = computed(() => route.path.startsWith('/employer') ? '/employer/dashboard' : '/seeker/dashboard')
</script>