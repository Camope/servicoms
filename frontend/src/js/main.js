import { createApp, watch } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import NotFound from '@/components/NotFound.vue'
import ListadoComisiones from '@/components/ListadoComisiones.vue'
const About = () => import('@/components/About.vue')
const DetalleComision = () => import('@/components/DetalleComision.vue')
const ListadoUsuarios = () => import('@/components/ListadoUsuarios.vue')

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar'
import InputSwitch from 'primevue/inputswitch'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'
import Menu from 'primevue/menu'

import '@/scss/styles.scss'

import * as bootstrap from '~bootstrap'

import 'bootstrap-icons/font/bootstrap-icons.css'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'


const pinia = createPinia()

const routes = [
    
    { path: '/', redirect: { name: 'comisiones' } },
    { path: '/about', name: 'about', component: About },
    { path: '/miscomisiones', name: 'miscomisiones', component: ListadoComisiones, props: { filtrar: true } },
    { path: '/comisiones', name: 'comisiones', component: ListadoComisiones },
    { path: '/detallecomision', name: 'detallecomision', component: DetalleComision },
    { path: '/usuarios', name: 'usuarios', component: ListadoUsuarios },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

import { useUsuariosStore } from '@/stores/usuarios'
router.beforeEach(async (to, from) => {       
  const auth = useUsuariosStore()
  if ((!auth.isAdmin && (to.name == 'usuarios')) || (!auth.isNotAdmin && (to.name == 'miscomisiones'))) {
    return { name: 'comisiones' }
  }
})

const app = createApp(App)

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('usuarioLogueado', JSON.stringify(state.usuarios.usuarioLogueado))
    },
    { deep: true }
)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    locale: {
        firstDayOfWeek: 1,
        dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }
})


app.component('Button', Button)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('InputNumber', InputNumber)
app.component('Dialog', Dialog)
app.component('Calendar', Calendar)
app.component('InputSwitch', InputSwitch)
app.component('Panel', Panel)
app.component('Divider', Divider)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Paginator', Paginator)

app.mount('#app')
