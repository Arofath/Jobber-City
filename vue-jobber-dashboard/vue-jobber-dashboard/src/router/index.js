import { createRouter, createWebHashHistory } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import PlaceholderView from "../views/PlaceholderView.vue";
import LoginView from "@/views/LoginView.vue";

// Master Data Views
import CategoriesView from "@/views/categories/CategoriesView.vue";
import ProvincesView from "@/views/locations/ProvincesView.vue";
import DistrictsView from "@/views/locations/DistrictsView.vue";
import JobLevelsView from "@/views/masterData/JobLevelsView.vue";
import EducationLevelsView from "@/views/masterData/EducationLevelsView.vue";
import SkillsView from "@/views/masterData/SkillsView.vue";
import EmploymentTypesView from "@/views/masterData/EmploymentTypesView.vue";
import WorkTypesView from "@/views/masterData/WorkTypesView.vue";
import IndustriesView from "@/views/masterData/IndustriesView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import CompaniesView from "@/views/Company/CompaniesView.vue";
import SeekerView from "@/views/Seeker/SeekerView.vue";
import JobPostsView from "@/views/JobPost/JobPostsView.vue";
import BroadcastsView from "@/views/Broadcast/BroadcastsView.vue";

const routes = [
  // 🟢 Public route (សម្រាប់ Login ចូលជា Admin)
  { path: "/login", component: LoginView, meta: { public: true } },

  // 🟢 បញ្ជូនអ្នកប្រើប្រាស់ពី / ទៅកាន់ទំព័រ Dashboard របស់ Admin ផ្ទាល់
  { path: "/", redirect: "/admin/dashboard" },

  // 🟢 ផ្នែកគ្រប់គ្រងរបស់ Admin ទាំងមូល (ក្តោបដោយ DashboardLayout)
  {
    path: "/admin",
    component: DashboardLayout,
    children: [
      // 📊 1. MAIN
      {
        path: "dashboard",
        component: DashboardView,
        meta: {
          title: "System Dashboard",
          subtitle: "Overview of platform activities and metrics",
        },
      },

      // 🏢 2. USER MANAGEMENT
      {
        path: "companies",
        component: CompaniesView,
        meta: {
          title: "Companies Management",
          subtitle: "Verify and manage employer accounts",
        },
      },
      {
        path: "seekers",
        component: SeekerView,
        meta: {
          title: "Job Seekers",
          subtitle: "Manage job seeker accounts and activities",
        },
      },

      // 💼 3. CONTENT MODERATION
      {
        path: "jobs",
        component: JobPostsView,
        meta: {
          title: "Job Posts Moderation",
          subtitle: "Review and manage all job postings on the platform",
        },
      },

      // 📢 4. COMMUNICATION
      {
        path: "broadcasts",
        component: BroadcastsView,
        meta: {
          title: "System Broadcasts",
          subtitle: "Send announcements to users",
        },
      },

      // ⚙️ 5. SYSTEM CONFIGURATION (Master Data)
      {
        path: "master-data/categories",
        component: CategoriesView,
        meta: { title: "Categories", subtitle: "Manage all job categories" },
      },
      {
        path: "master-data/locations",
        component: ProvincesView,
        meta: {
          title: "Locations (Provinces)",
          subtitle: "Manage provinces and districts",
        },
      },
      {
        path: "master-data/districts",
        component: DistrictsView,
        meta: { title: "Districts", subtitle: "Manage districts by province" },
      },
      {
        path: "master-data/job-levels",
        component: JobLevelsView,
        meta: { title: "Job Levels", subtitle: "Manage job experience levels" },
      },
      {
        path: "master-data/education-levels",
        component: EducationLevelsView,
        meta: {
          title: "Education Levels",
          subtitle: "Manage education and qualification levels",
        },
      },
      {
        path: "master-data/skills",
        component: SkillsView,
        meta: {
          title: "Skills",
          subtitle: "Manage all available skills for job postings",
        },
      },
      {
        path: "master-data/employment-types",
        component: EmploymentTypesView,
        meta: {
          title: "Employment Types",
          subtitle: "Manage employment type options",
        },
      },
      {
        path: "master-data/work-types",
        component: WorkTypesView,
        meta: {
          title: "Work Types",
          subtitle: "Manage work type options",
        },
      },
      {
        path: "master-data/industries",
        component: IndustriesView,
        meta: {
          title: "Industries",
          subtitle: "Manage industry sectors",
        },
      },
    ],
  },

  // 🔴 ចាប់យកគ្រប់ URL ណាដែលវាយខុស ហើយបោះទៅកាន់ Dashboard វិញ (ការពារការគាំង ឬលោតទំព័រស)
  {
    path: "/:pathMatch(.*)*",
    redirect: "/admin/dashboard",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// ── Auth guard (កែប្រែដោយប្រើ next ឱ្យបានច្បាស់លាស់) ─────────────────────────
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  const isPublic = to.meta?.public === true;

  // ទី១: បើអត់មាន Token ហើយព្យាយាមចូលទំព័រ Admin នោះបោះទៅ Login
  if (!isPublic && !token) {
    return next("/login");
  }

  // ទី២: បើមាន Token រួចហើយ តែព្យាយាមចូលទំព័រ Login នោះបោះទៅ Dashboard
  if (to.path === "/login" && token) {
    return next("/admin/dashboard");
  }

  // ទី៣: ករណីធម្មតា អនុញ្ញាតឱ្យទៅមុខបន្ត
  next();
});

export default router;
