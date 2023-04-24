import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Import Components
import App from '@/App.vue'
import About from '@/components/About.vue'
import NotFound from '@/components/NotFound.vue'
import Comisiones from '@/components/Comisiones.vue'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'                      //icons
import PrimeVue from 'primevue/config'

// Definimos instancia de Pinia
const pinia = createPinia()

// Define Routes
const routes = [
    { path: '/', name: 'home', component: About },
    { path: '/about', name: 'about', component: About },
    { path: '/comisiones', name: 'comisiones', component: Comisiones },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes // short for `routes: routes`
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
