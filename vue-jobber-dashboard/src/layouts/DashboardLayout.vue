<template>
  <div class="flex h-screen bg-surface overflow-hidden">
    
    <!-- ១. Sidebar ខាងឆ្វេង (មិនបាច់បោះ mode ចូលទៀតទេ) -->
    <AppSidebar />
    
    <!-- ២. ផ្នែកកណ្តាល (Topbar + Content) -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      
      <AppTopbar :title="pageTitle" :subtitle="pageSubtitle" />
      
      <main class="flex-1 overflow-y-auto scrollbar-thin p-6">
        <!-- ទំព័រផ្សេងៗនឹងមកបង្ហាញនៅទីនេះ -->
        <router-view />
      </main>
      
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppTopbar from "../components/ui/AppTopbar.vue";
import AppSidebar from "./AppSidebar.vue";

const route = useRoute();

// ចាប់យក Title និង Subtitle ពី Router មកបង្ហាញដោយស្វ័យប្រវត្តិ
const pageTitle = computed(() => route.meta?.title ?? "Dashboard");
const pageSubtitle = computed(() => route.meta?.subtitle ?? "");
</script>