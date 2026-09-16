<template>
  <header class="h-16 bg-white border-b border-[#e8eaf2] px-6 flex items-center justify-between shrink-0">
    <div>
      <h1 class="font-display text-lg font-bold text-gray-900">{{ title }}</h1>
      <p class="text-xs text-gray-400">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="relative hidden md:block">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
        </svg>
        <input type="text" placeholder="Search…" class="pl-9 pr-4 py-2 text-sm bg-[#f8f9fc] border border-[#e8eaf2] rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400" />
      </div>
      <button class="relative w-9 h-9 rounded-lg bg-[#f8f9fc] border border-[#e8eaf2] flex items-center justify-center hover:bg-gray-100 transition">
        <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>
      <img src="https://ui-avatars.com/api/?name=Alex+Rivera&background=3673f5&color=fff&size=80" class="w-9 h-9 rounded-full cursor-pointer ring-2 ring-brand-200" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>