<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const canvasRef = ref(null)
let chart = null

onMounted(() => {
  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label:'Applied',  data:[210,185,260,320,290,348], backgroundColor:'rgba(54,115,245,0.85)',  borderRadius:6, borderSkipped:false },
        { label:'Screened', data:[74,62,91,108,101,124],    backgroundColor:'rgba(124,58,237,0.75)', borderRadius:6, borderSkipped:false },
        { label:'Hired',    data:[3,2,4,5,4,6],             backgroundColor:'rgba(16,163,74,0.85)',  borderRadius:6, borderSkipped:false },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode:'index', intersect:false },
      plugins: { legend:{ labels:{ font:{ size:11, family:'Inter' }, color:'#6b7280', boxWidth:10, usePointStyle:true } } },
      scales: {
        x: { grid:{ display:false }, ticks:{ color:'#9ca3af', font:{ size:11 } } },
        y: { grid:{ color:'#f1f5f9' }, ticks:{ color:'#9ca3af', font:{ size:10 } } },
      },
    },
  })
})
onUnmounted(() => chart?.destroy())
</script>