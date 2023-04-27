import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Import Components
import App from '@/App.vue'
import About from '@/components/About.vue'
import NotFound from '@/components/NotFound.vue'
import Comisiones from '@/components/Comisiones.vue'
import ListadoComisiones from '@/components/ListadoComisiones.vue'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'                      //icons


// Definimos instancia de Pinia
const pinia = createPinia()

// Define Routes
const routes = [
    { path: '/', name: 'home', component: About },
    { path: '/about', name: 'about', component: About },
    { path: '/comisiones', name: 'comisiones', component: ListadoComisiones },
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

app.component('Button', Button);
app.component('InputText', InputText)
app.component('Column', Column)
app.component('Tag', Tag)
app.component('DataTable', DataTable)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('RadioButton', RadioButton)
app.component('InputNumber', InputNumber)
app.component('Dialog', Dialog)

app.mount('#app')
