<template>
  <!-- 🎯 បន្ថែម transition-all និង dynamic width ផ្អែកលើ state `isCollapsed` -->
<aside 
    class="bg-white border-r border-surface-border flex flex-col shrink-0 h-screen transition-all duration-300 relative z-20"
    :class="isCollapsed ? 'w-19' : 'w-64'"
  >
    <!-- 🎯 Logo & Toggle Button -->
    <div
      class="px-4 py-5 border-b border-surface-border flex items-center h-18 shrink-0 bg-white z-20"
      :class="isCollapsed ? 'justify-center' : 'justify-start'"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <!-- Logo Icon -->
        <div class="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm shrink-0">
          <img src="/src/assets/jbc.png" alt="">
        </div>
        <!-- Logo Text -->
        <div v-if="!isCollapsed" class="whitespace-nowrap flex-1">
          <p class="font-display text-[15px] font-bold text-gray-900 leading-none">Jobber City</p>
          <!-- <p class="text-[11px] text-brand-600 font-medium mt-0.5">Super Admin</p> -->
        </div>
      </div>

      <!-- 🎯 ប៊ូតុង Toggle (ប្រើ top-1/2 និង -translate-y-1/2 ដើម្បីឱ្យនៅចំកណ្តាលបញ្ឈរស្អាត) -->
      <button
        @click="toggleSidebar"
        class="absolute -right-3.5 top-9 -translate-y-1/2 w-7 h-7 bg-white border border-surface-border rounded-full flex items-center justify-center text-gray-400 hover:text-brand-600 hover:border-brand-300 shadow-sm transition-all z-30 focus:outline-none"
        title="Toggle Sidebar"
      >
        <svg
          class="w-4 h-4 transition-transform duration-300"
          :class="isCollapsed ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 px-3 py-4 space-y-5 overflow-y-auto scrollbar-thin">
      <div v-for="(group, gIndex) in adminNav" :key="gIndex">
        <!-- Group Title (បង្ហាញអក្សរពេលបើក បង្ហាញបន្ទាត់ពេលបិទ) -->
        <p
          v-if="!isCollapsed"
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 whitespace-nowrap"
        >
          {{ group.section }}
        </p>
        <div v-else class="h-px bg-gray-100 mx-2 mb-2 mt-4"></div>

        <div class="space-y-0.5">
          <template v-for="item in group.items" :key="item.id">
            <!-- 🎯 ១. ម៉ឺនុយធម្មតា (អត់មានកូន) -->
            <router-link
              v-if="!item.children"
              :to="item.route"
              class="flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors group"
              :class="
                route.path === item.route
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
              "
              :title="isCollapsed ? item.label : ''"
            >
              <!-- 🎯 ដក Background ប្រផេះចេញ ទុកតែ Icon សុទ្ធ -->
              <span
                class="w-5 h-5 shrink-0 transition-colors"
                :class="
                  route.path === item.route
                    ? 'text-brand-600'
                    : 'text-gray-400 group-hover:text-brand-500'
                "
                v-html="item.icon"
              ></span>

              <span v-if="!isCollapsed" class="whitespace-nowrap">{{
                item.label
              }}</span>

              <span
                v-if="!isCollapsed && item.badge"
                class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200 bg-red-50 text-red-600 leading-none"
              >
                {{ item.badge }}
              </span>
            </router-link>

            <!-- 🎯 ២. ម៉ឺនុយមានកូន (Collapsible Master Data) -->
            <div v-else class="flex flex-col">
              <button
                @click="handleParentClick(item.id)"
                class="flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors w-full text-left group"
                :class="
                  openMenus.includes(item.id) && !isCollapsed
                    ? 'bg-gray-50 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                "
                :title="isCollapsed ? item.label : ''"
              >
                <!-- 🎯 ដក Background ប្រផេះចេញ ទុកតែ Icon សុទ្ធ -->
                <span
                  class="w-5 h-5 shrink-0 transition-colors"
                  :class="
                    openMenus.includes(item.id) && !isCollapsed
                      ? 'text-brand-600'
                      : 'text-gray-400 group-hover:text-brand-500'
                  "
                  v-html="item.icon"
                ></span>

                <span v-if="!isCollapsed" class="whitespace-nowrap">{{
                  item.label
                }}</span>

                <svg
                  v-if="!isCollapsed"
                  class="w-4 h-4 ml-auto text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': openMenus.includes(item.id) }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- 🎯 បញ្ជីកូនៗ (Children) បង្ហាញតែពេលអត់បិទ Sidebar -->
              <transition name="slide-fade">
                <div
                  v-show="openMenus.includes(item.id) && !isCollapsed"
                  class="pl-10 pr-2 pt-1 pb-1 space-y-0.5"
                >
                  <router-link
                    v-for="child in item.children"
                    :key="child.id"
                    :to="child.route"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-[12.5px] text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-colors whitespace-nowrap group"
                    active-class="text-brand-700 bg-brand-50 font-medium"
                  >
                    <!-- ចំណុចតូចៗនៅពីមុខ -->
                    <div
                      class="w-1 h-1 rounded-full transition-colors"
                      :class="
                        route.path === child.route
                          ? 'bg-brand-600'
                          : 'bg-gray-300 group-hover:bg-brand-400'
                      "
                    ></div>
                    {{ child.label }}
                  </router-link>
                </div>
              </transition>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <!-- User Profile Bottom -->
    <div class="p-3 border-t border-surface-border sticky bottom-0 bg-white">
      <div
        class="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-50 transition-colors cursor-pointer"
        :class="isCollapsed ? 'justify-center' : ''"
        @click="isCollapsed ? handleLogout() : null"
        :title="isCollapsed ? 'Logout' : ''"
      >
        <img
          :src="
            authStore.user?.avatar_url ||
            'https://ui-avatars.com/api/?name=Admin&background=3673f5&color=fff'
          "
          class="w-8 h-8 rounded-full shrink-0 ring-1 ring-gray-200"
        />

        <div v-if="!isCollapsed" class="min-w-0 flex-1">
          <p class="text-[13px] font-bold text-gray-800 truncate">
            {{ authStore.user?.first_name || "System" }}
            {{ authStore.user?.last_name || "Admin" }}
          </p>
          <p class="text-[11px] text-gray-500 truncate">
            {{ authStore.user?.email || "admin@jobsphere.com" }}
          </p>
        </div>

        <button
          v-if="!isCollapsed"
          @click.stop="handleLogout"
          class="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          title="Logout"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { adminNav } from "@/data/navigation.js";
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// State សម្រាប់គ្រប់គ្រងការ បិទ/បើក Sidebar ទាំងមូល
const isCollapsed = ref(false);

// State សម្រាប់បញ្ជី Dropdown Master Data
const openMenus = ref(["master-data"]);

// មុខងារ បិទ/បើក Sidebar ទូទៅ
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

// មុខងារ ពេលចុចលើ Menu ដែលមានកូន
function handleParentClick(menuId) {
  if (isCollapsed.value) {
    // បើ Sidebar កំពុងបិទ ពេលចុចលើវា ត្រូវលាត Sidebar មកវិញ ហើយបើក Menu ហ្នឹង
    isCollapsed.value = false;
    if (!openMenus.value.includes(menuId)) {
      openMenus.value.push(menuId);
    }
  } else {
    // បើ Sidebar កំពុងបើកស្រាប់ ធ្វើការបត់/លាត ធម្មតា
    if (openMenus.value.includes(menuId)) {
      openMenus.value = openMenus.value.filter((id) => id !== menuId);
    } else {
      openMenus.value.push(menuId);
    }
  }
}

function handleLogout() {
  authStore.logout();
  router.push("/login");
}
</script>

<style scoped>
/* ធ្វើឱ្យចលនាបើក/បិទម៉ឺនុយរលូន */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
  transform-origin: top;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
