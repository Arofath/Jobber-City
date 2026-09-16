export function useStatusClass() {
  const statusClass = (status) => ({
    'Under Review': 'badge-blue',
    'Interview':    'badge-purple',
    'Rejected':     'badge-red',
    'Offer':        'badge-green',
    'Withdrawn':    'badge-gray',
  })[status] ?? 'badge-blue'

  const stageClass = (stage) => ({
    'Final Round': 'badge-green',
    'Technical':   'badge-blue',
    'HR Screen':   'badge-amber',
    'Offer':       'badge-purple',
    'Rejected':    'badge-red',
  })[stage] ?? 'badge-blue'

  const urgencyClass = (urgency) => ({
    'High':   'badge-red',
    'Medium': 'badge-amber',
    'Low':    'badge-green',
  })[urgency] ?? 'badge-gray'

  return { statusClass, stageClass, urgencyClass }
}