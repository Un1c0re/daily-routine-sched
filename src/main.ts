import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import {storePlugin} from "pinia-plugin-store";
import router from "./router";


const plugin = storePlugin({
    stores: ["CardStore"],
    storage: localStorage,
})

const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

pinia.use(plugin);
app.use(pinia)
app.use(router);
app.use(ElementPlus)
app.mount('#app')
