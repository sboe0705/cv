import { createApp } from 'vue'

// Archivo 400/600/800 — self-hosted, per the handoff's asset notes.
import '@fontsource/archivo/400.css'
import '@fontsource/archivo/600.css'
import '@fontsource/archivo/800.css'

import App from './App.vue'
import './styles/tokens.css'
import './styles/base.css'
import './styles/print.css'

createApp(App).mount('#app')
