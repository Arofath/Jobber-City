<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({ statuses: { type: Array, required: true } })
const canvasRef = ref(null)
let chart = null

onMounted(() => {
  chart = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: props.statuses.map(s => s.label),
      datasets: [{ data: props.statuses.map(s => s.value), backgroundColor: props.statuses.map(s => s.color), borderWidth:0, hoverOffset:6 }],
    },
    options: {
      responsive: true, cutout:'72%',
      plugins: { legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => ` ${ctx.label}: ${ctx.raw}` } } },
    },
  })
})
onUnmounted(() => chart?.destroy())
</script>