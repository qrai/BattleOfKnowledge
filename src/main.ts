import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import '@/assets/style/vars.scss'
import '@/assets/style/fonts.scss'
import '@/assets/style/flex.scss'
import '@/assets/style/button.scss'
import '@/assets/style/story.scss'

createApp(App).use(router).mount('#app')
