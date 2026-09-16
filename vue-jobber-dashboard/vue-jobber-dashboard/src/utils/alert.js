import Swal from 'sweetalert2'

// ── Toast (top-right notification) ─────────────────────────
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export function toastSuccess(message) {
  Toast.fire({ icon: 'success', title: message })
}

export function toastError(message) {
  Toast.fire({ icon: 'error', title: message })
}

export function toastWarning(message) {
  Toast.fire({ icon: 'warning', title: message })
}

// ── Confirm delete dialog ───────────────────────────────────
export function confirmDelete(name) {
  return Swal.fire({
    title: 'Are you sure?',
    html: `You are about to delete <strong>${name}</strong>.<br/>This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#ef4444',
    cancelButtonColor:  '#e5e7eb',
    reverseButtons: true,
    customClass: {
      popup:         'rounded-2xl font-sans text-sm',
      title:         'text-gray-900 font-bold text-lg',
      htmlContainer: 'text-gray-500',
      confirmButton: 'rounded-xl px-5 py-2.5 text-sm font-semibold',
      cancelButton:  'rounded-xl px-5 py-2.5 text-sm font-semibold !text-gray-700',
    },
  })
}