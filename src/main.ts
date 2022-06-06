import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGridLayout from 'vue-grid-layout'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(router)
    .use(VueGridLayout)
    .use(ElementPlus)
    .mount('#app')


