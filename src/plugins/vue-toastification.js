import Toast, { POSITION } from 'vue-toastification'

import 'vue-toastification/dist/index.css'

export const toast = Toast

export const toastOptions = {
  transition: 'Vue-Toastification__fade',
  position: POSITION.TOP_CENTER,
  icon: false,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
}
