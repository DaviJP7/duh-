import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import DefaultLayout from '@/layouts/default.layout.vue'
import AppLayout from '@/layouts/app.layout.vue'
import '@mdi/font/css/materialdesignicons.css' 

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives,
})

const app = createApp(App)
app.component('default-layout', DefaultLayout)
app.component('app-layout', AppLayout)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(vuetify)


app.mount('#app')
