import { useToast as getToast } from 'vue-toastification'

export function useToast() {
  const showError = (msg, raiseError = false) => {
    getToast().error(msg, {
      toastClassName: ['custom-toast', 'custom-toast-error'],
      timeout: 3000,
    })
    if (raiseError) throw new Error(msg)
  }

  const showSuccess = msg => {
    getToast().success(msg, {
      toastClassName: ['custom-toast', 'custom-toast-success'],
      timeout: 3000,
    })
  }

  const showInfo = msg => {
    getToast().info(msg, {
      toastClassName: ['custom-toast', 'custom-toast-info'],
      timeout: 3000,
    })
  }

  return { showSuccess, showError, showInfo }
}
