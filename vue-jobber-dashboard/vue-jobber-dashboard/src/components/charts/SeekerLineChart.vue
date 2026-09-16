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
    type: 'line',
    data: {
      labels: ['Apr 27','May 4','May 11','May 18','May 25','Jun 1','Jun 8','Jun 15'],
      datasets: [
        { label:'Applications', data:[5,8,6,12,9,14,10,16], borderColor:'#3673f5', backgroundColor:'rgba(54,115,245,0.08)', fill:true, tension:0.45, pointBackgroundColor:'#3673f5', pointRadius:4, pointHoverRadius:6 },
        { label:'Interviews',   data:[0,1,1,2,1,3,2,4],     borderColor:'#7c3aed', backgroundColor:'rgba(124,58,237,0.07)', fill:true, tension:0.45, pointBackgroundColor:'#7c3aed', pointRadius:4, pointHoverRadius:6, borderDash:[4,3] },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode:'index', intersect:false },
      plugins: { legend:{ labels:{ font:{ size:11, family:'Inter' }, color:'#6b7280', boxWidth:10, usePointStyle:true } } },
      scales: {
        x: { grid:{ display:false }, ticks:{ color:'#9ca3af', font:{ size:10 } } },
        y: { grid:{ color:'#f1f5f9' }, ticks:{ color:'#9ca3af', font:{ size:10 }, stepSize:4 } },
      },
    },
  })
})
onUnmounted(() => chart?.destroy())
</script>