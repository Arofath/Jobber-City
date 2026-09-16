import { icons } from "./icons.js";

export const adminNav = [
  {
    section: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: icons.dashboard,
        route: "/admin/dashboard",
      },
    ],
  },
  {
    section: "User Management",
    items: [
      {
        id: "companies",
        label: "Companies",
        icon: icons.companies,
        route: "/admin/companies",
      },
      {
        id: "seekers",
        label: "Job Seekers",
        icon: icons.seekers,
        route: "/admin/seekers",
      },
    ],
  },
  {
    section: "Content Moderation",
    items: [
      {
        id: "jobs",
        label: "Job Posts",
        icon: icons.jobs,
        route: "/admin/jobs",
      },
    ],
  },
  // {
  //   section: "Communication",
  //   items: [
  //     {
  //       id: "broadcasts",
  //       label: "Broadcasts",
  //       icon: icons.broadcasts,
  //       route: "/admin/broadcasts",
  //     },
  //   ],
  // },
  {
    section: "System Configuration",
    items: [
      {
        id: "master-data",
        label: "Master Data",
        icon: icons.master_data,
        children: [
          {
            id: "categories",
            label: "Categories",
            route: "/admin/master-data/categories",
          },
          {
            id: "provinces",
            label: "Locations",
            route: "/admin/master-data/locations",
          },
          {
            id: "job-levels",
            label: "Job Levels",
            route: "/admin/master-data/job-levels",
          },
          {
            id: "education",
            label: "Education Levels",
            route: "/admin/master-data/education-levels",
          },
          { id: "skills", label: "Skills", route: "/admin/master-data/skills" },
          {
            id: "emp-types",
            label: "Employment Types",
            route: "/admin/master-data/employment-types",
          },
          {
            id: "work-types",
            label: "Work Types",
            route: "/admin/master-data/work-types",
          },
          {
            id: "industries",
            label: "Industries",
            route: "/admin/master-data/industries",
          },
        ],
      },
    ],
  },
];
