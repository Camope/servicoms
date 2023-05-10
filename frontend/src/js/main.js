import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Import Components
import App from '@/App.vue'
import About from '@/components/About.vue'
import NotFound from '@/components/NotFound.vue'
import ListadoComisiones from '@/components/ListadoComisiones.vue'
import DetalleComision from '@/components/DetalleComision.vue'

// Importación de componentes de PrimeVue
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar'
import InputSwitch from 'primevue/inputswitch'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import Menu from 'primevue/menu'

// Import our custom CSS
import '@/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from '~bootstrap'

import 'bootstrap-icons/font/bootstrap-icons.css'

import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'                      //icons
import 'primeflex/primeflex.css'


// Definimos instancia de Pinia
const pinia = createPinia()

// Define Routes
const routes = [
    // Eliminar redirección cuando esté desarrollada el home
    { path: '/', redirect: { name: 'comisiones' } },  //name: 'home', component: About },
    { path: '/about', name: 'about', component: About },
    { path: '/miscomisiones', name: 'miscomisiones', component: ListadoComisiones, props: { filtrar: true } },
    { path: '/comisiones', name: 'comisiones', component: ListadoComisiones },
    { path: '/comision/:comisionId', name: 'comision', component: DetalleComision, props: true },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes // short for `routes: routes`
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    locale: {
        firstDayOfWeek: 1,
        dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }
});

// Se añaden los componentes de PrimeVue utilizados en la aplicación
app.component('Button', Button);
app.component('InputText', InputText)
app.component('Column', Column)
app.component('Tag', Tag)
app.component('DataTable', DataTable)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('InputNumber', InputNumber)
app.component('Dialog', Dialog)
app.component('Calendar', Calendar)
app.component('InputSwitch', InputSwitch)
app.component('Panel', Panel)
app.component('Divider', Divider)
// app.component('Menu', Menu)

app.mount('#app')
