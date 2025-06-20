import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { bootAuth } from './composables/useAuth'

import { toast, toastOptions } from './plugins/vue-toastification'

bootAuth()
createApp(App).use(router).use(toast, toastOptions).mount('#app')
