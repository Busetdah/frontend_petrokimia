import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/index.js'
import VideoBackground from 'vue-responsive-video-background-player'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.component('VideoBackground', VideoBackground)
app.use(ElementPlus)
app.mount('#app')
