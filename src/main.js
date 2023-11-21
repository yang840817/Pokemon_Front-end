/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()


// Create vue app
const app = createApp(App)
const pinia = createPinia()

// Use plugins
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(layoutsPlugin)

// Mount vue app
app.mount('#app')
