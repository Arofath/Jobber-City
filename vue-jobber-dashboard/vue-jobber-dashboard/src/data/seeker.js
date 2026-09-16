export const seekerKPIs = [
  {
    label: 'Total Applications', value: '84', trend: 12,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg>`,
    iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
  },
  {
    label: 'Interviews Scheduled', value: '7', trend: 40,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/></svg>`,
    iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
  },
  {
    label: 'Profile Views', value: '1,240', trend: 8,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    label: 'Offer Rate', value: '8.3%', trend: -2,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>`,
    iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
  },
]

export const appStatuses = [
  { label: 'Under Review', value: 32, color: '#3673f5' },
  { label: 'Interview',    value: 7,  color: '#7c3aed' },
  { label: 'Rejected',     value: 29, color: '#ef4444' },
  { label: 'Offer',        value: 4,  color: '#16a34a' },
  { label: 'Withdrawn',    value: 12, color: '#94a3b8' },
]

export const recentApplications = [
  { company: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', role: 'Frontend Engineer', date: 'Jun 18', status: 'Interview',    match: 91 },
  { company: 'Notion', logo: 'https://logo.clearbit.com/notion.so',  role: 'Product Designer',  date: 'Jun 15', status: 'Under Review', match: 78 },
  { company: 'Figma',  logo: 'https://logo.clearbit.com/figma.com',  role: 'UX Engineer',       date: 'Jun 12', status: 'Rejected',     match: 64 },
  { company: 'Linear', logo: 'https://logo.clearbit.com/linear.app', role: 'Full Stack Dev',    date: 'Jun 10', status: 'Offer',        match: 95 },
  { company: 'Vercel', logo: 'https://logo.clearbit.com/vercel.com', role: 'Dev Advocate',      date: 'Jun 8',  status: 'Under Review', match: 82 },
]

export const recommendedJobs = [
  { title: 'Senior Vue Developer', company: 'Atlassian', location: 'Remote',        type: 'Full-time', salary: '$130–160k', match: 94, logo: 'https://logo.clearbit.com/atlassian.com' },
  { title: 'Frontend Engineer',    company: 'GitHub',    location: 'San Francisco', type: 'Hybrid',    salary: '$140–175k', match: 88, logo: 'https://logo.clearbit.com/github.com' },
  { title: 'UI/UX Engineer',       company: 'Shopify',   location: 'Remote',        type: 'Full-time', salary: '$110–140k', match: 81, logo: 'https://logo.clearbit.com/shopify.com' },
  { title: 'React Developer',      company: 'Airbnb',    location: 'New York',      type: 'On-site',   salary: '$125–155k', match: 76, logo: 'https://logo.clearbit.com/airbnb.com' },
]