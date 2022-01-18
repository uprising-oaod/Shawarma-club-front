import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App).use(store)

app.use(ElementPlus)
app.mount('#app')
