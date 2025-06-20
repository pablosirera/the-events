import { useToast as getToast } from 'vue-toastification'

export function useToast() {
  const showError = (msg, raiseError = false) => {
    getToast().error(msg, {
      toastClassName: ['custom-toast', 'custom-toast-error'],
    })
    if (raiseError) throw new Error(msg)
  }

  const showSuccess = msg => {
    getToast().success(msg, {
      toastClassName: ['custom-toast', 'custom-toast-success'],
    })
  }

  const showInfo = msg => {
    getToast().info(msg, {
      toastClassName: ['custom-toast', 'custom-toast-info'],
    })
  }

  return { showSuccess, showError, showInfo }
}
