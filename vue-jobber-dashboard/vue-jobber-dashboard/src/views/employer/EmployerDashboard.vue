<template>
    <div>
        <!-- KPI Row -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard v-for="kpi in employerKPIs" :key="kpi.label" v-bind="kpi" />
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div class="lg:col-span-2 bg-white rounded-2xl border border-[#e8eaf2] p-5"
                style="box-shadow:0 1px 3px 0 rgba(16,24,40,0.06)">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="font-display text-sm font-bold text-gray-900">Applications Received</h3>
                        <p class="text-xs text-gray-400">By job posting · last 6 months</p>
                    </div>
                    <select
                        class="text-xs border border-[#e8eaf2] rounded-lg px-2 py-1.5 text-gray-600 bg-[#f8f9fc] focus:outline-none">
                        <option>Last 6 months</option>
                        <option>This year</option>
                    </select>
                </div>
                <EmployerBarChart />
            </div>

            <div class="bg-white rounded-2xl border border-[#e8eaf2] p-5"
                style="box-shadow:0 1px 3px 0 rgba(16,24,40,0.06)">
                <h3 class="font-display text-sm font-bold text-gray-900 mb-1">Hiring Funnel</h3>
                <p class="text-xs text-gray-400 mb-4">Current cycle conversion</p>
                <div class="space-y-3">
                    <div v-for="stage in hiringFunnel" :key="stage.label">
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-gray-600 font-medium">{{ stage.label }}</span>
                            <span class="font-bold text-gray-800">{{ stage.count.toLocaleString() }}</span>
                        </div>
                        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full rounded-full" :style="{ width: stage.pct + '%', background: stage.color }">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 pt-4 border-t border-[#e8eaf2]">
                    <p class="text-xs text-gray-400 mb-1">Avg. time to hire</p>
                    <p class="text-2xl font-display font-extrabold text-gray-900">18 <span
                            class="text-base font-medium text-gray-400">days</span></p>
                </div>
            </div>
        </div>

        <!-- Bottom Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 bg-white rounded-2xl border border-[#e8eaf2] overflow-hidden"
                style="box-shadow:0 1px 3px 0 rgba(16,24,40,0.06)">
                <div class="flex items-center justify-between px-5 py-4 border-b border-[#e8eaf2]">
                    <h3 class="font-display text-sm font-bold text-gray-900">Top Candidates</h3>
                    <div class="flex items-center gap-2">
                        <select
                            class="text-xs border border-[#e8eaf2] rounded-lg px-2 py-1.5 text-gray-600 bg-[#f8f9fc] focus:outline-none">
                            <option>All Roles</option>
                            <option>Frontend Engineer</option>
                            <option>Product Manager</option>
                        </select>
                        <button class="text-xs text-brand-600 font-semibold hover:underline">View all</button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="bg-[#f8f9fc] text-gray-400 font-semibold uppercase tracking-wider text-left">
                                <th class="px-5 py-3">Candidate</th>
                                <th class="px-5 py-3">Applying For</th>
                                <th class="px-5 py-3">Experience</th>
                                <th class="px-5 py-3">Stage</th>
                                <th class="px-5 py-3">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in topCandidates" :key="c.name"
                                class="border-t border-[#e8eaf2] hover:bg-[#f8f9fc] transition">
                                <td class="px-5 py-3.5">
                                    <div class="flex items-center gap-2.5">
                                        <img :src="c.avatar" class="w-7 h-7 rounded-full object-cover" />
                                        <div>
                                            <p class="font-semibold text-gray-800">{{ c.name }}</p>
                                            <p class="text-gray-400">{{ c.location }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-3.5 text-gray-600">{{ c.role }}</td>
                                <td class="px-5 py-3.5 text-gray-600">{{ c.exp }}</td>
                                <td class="px-5 py-3.5">
                                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold"
                                        :class="stageClass(c.stage)">{{ c.stage }}</span>
                                </td>
                                <td class="px-5 py-3.5">
                                    <div class="flex items-center gap-1.5">
                                        <div class="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full"
                                                :style="{ width: c.score + '%', background: c.score >= 80 ? '#16a34a' : '#3673f5' }">
                                            </div>
                                        </div>
                                        <span class="font-bold text-gray-700">{{ c.score }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-[#e8eaf2] overflow-hidden"
                style="box-shadow:0 1px 3px 0 rgba(16,24,40,0.06)">
                <div class="flex items-center justify-between px-5 py-4 border-b border-[#e8eaf2]">
                    <h3 class="font-display text-sm font-bold text-gray-900">Active Postings</h3>
                    <button
                        class="text-xs bg-brand-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-700 transition">+
                        Post</button>
                </div>
                <div class="divide-y divide-[#e8eaf2]">
                    <div v-for="post in activePostings" :key="post.title"
                        class="px-5 py-4 hover:bg-[#f8f9fc] transition cursor-pointer">
                        <div class="flex items-start justify-between gap-2">
                            <div class="min-w-0">
                                <p class="text-sm font-semibold text-gray-900 truncate">{{ post.title }}</p>
                                <p class="text-xs text-gray-500 mt-0.5">{{ post.dept }} · {{ post.location }}</p>
                                <div class="flex items-center gap-3 mt-2">
                                    <span class="text-xs text-gray-500">{{ post.applicants }} applicants</span>
                                    <span class="text-xs text-gray-400">{{ post.daysLeft }}d left</span>
                                </div>
                            </div>
                            <span class="shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold"
                                :class="urgencyClass(post.urgency)">{{ post.urgency }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import KpiCard from '../../components/ui/KpiCard.vue'
import EmployerBarChart from '../../components/charts/EmployerBarChart.vue'
import { employerKPIs, hiringFunnel, topCandidates, activePostings } from '../../data/employer.js'
import { useStatusClass } from '../../composables/useStatusClass.js'

const { stageClass, urgencyClass } = useStatusClass()
</script>