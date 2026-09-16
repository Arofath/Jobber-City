export const employerKPIs = [
  {
    label: 'Active Postings', value: '14', trend: 17,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-4.073M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m7.5 0h-7.5m7.5 0h2.25M6 9H3.75"/></svg>`,
    iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
  },
  {
    label: 'Total Applicants', value: '1,382', trend: 23,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,
    iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
  },
  {
    label: 'Interviews This Week', value: '23', trend: 15,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/></svg>`,
    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    label: 'Offers Extended', value: '6', trend: -8,
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
  },
]

export const hiringFunnel = [
  { label: 'Applied',     count: 1382, pct: 100, color: '#3673f5' },
  { label: 'Screened',    count: 486,  pct: 35,  color: '#7c3aed' },
  { label: 'Interviewed', count: 142,  pct: 10,  color: '#f59e0b' },
  { label: 'Shortlisted', count: 38,   pct: 3,   color: '#10b981' },
  { label: 'Offer Made',  count: 6,    pct: 1,   color: '#ef4444' },
]

export const topCandidates = [
  { name: 'Sarah Chen',   location: 'San Francisco', role: 'Frontend Eng.', exp: '6 yrs', stage: 'Final Round', score: 96, avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=7c3aed&color=fff&size=80' },
  { name: 'Marcus Webb',  location: 'New York',      role: 'Product Mgr',   exp: '8 yrs', stage: 'Technical',   score: 88, avatar: 'https://ui-avatars.com/api/?name=Marcus+Webb&background=3673f5&color=fff&size=80' },
  { name: 'Priya Kapoor', location: 'Remote',        role: 'Data Analyst',  exp: '4 yrs', stage: 'HR Screen',   score: 82, avatar: 'https://ui-avatars.com/api/?name=Priya+Kapoor&background=10b981&color=fff&size=80' },
  { name: 'James Liu',    location: 'Austin',        role: 'Backend Dev',   exp: '5 yrs', stage: 'Offer',       score: 91, avatar: 'https://ui-avatars.com/api/?name=James+Liu&background=f59e0b&color=fff&size=80' },
  { name: 'Nina Torres',  location: 'Chicago',       role: 'UX Designer',   exp: '7 yrs', stage: 'Technical',   score: 79, avatar: 'https://ui-avatars.com/api/?name=Nina+Torres&background=ef4444&color=fff&size=80' },
]

export const activePostings = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering',    location: 'Remote',   applicants: 248, daysLeft: 12, urgency: 'High' },
  { title: 'Product Manager',          dept: 'Product',        location: 'New York', applicants: 183, daysLeft: 21, urgency: 'Medium' },
  { title: 'Data Scientist',           dept: 'Data',           location: 'Remote',   applicants: 97,  daysLeft: 30, urgency: 'Low' },
  { title: 'DevOps Engineer',          dept: 'Infrastructure', location: 'Austin',   applicants: 64,  daysLeft: 8,  urgency: 'High' },
]