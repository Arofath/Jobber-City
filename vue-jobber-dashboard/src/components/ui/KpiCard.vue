<template>
  <div class="bg-white rounded-2xl p-5 border border-[#e8eaf2]" style="box-shadow:0 1px 3px 0 rgba(16,24,40,0.06),0 1px 2px -1px rgba(16,24,40,0.04)">
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="iconBg">
        <span class="w-5 h-5" :class="iconColor" v-html="icon"></span>
      </div>
      <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="trend > 0 ? 'badge-green' : 'badge-red'">
        {{ trend > 0 ? '↑' : '↓' }}{{ Math.abs(trend) }}%
      </span>
    </div>
    <p class="text-2xl font-display font-extrabold text-gray-900">{{ value }}</p>
    <p class="text-xs text-gray-500 mt-0.5">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: Number, required: true },
  icon:      { type: String, required: true },
  iconBg:    { type: String, required: true },
  iconColor: { type: String, required: true },
})
</script>