
<script>
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'


export default {
    components: {},
    data() {
        return { listaComisiones: [] }
    },
    computed: {
        //...mapState(useComisionesStore, ['listaComisiones']),
    },
    methods: {
        ...mapActions(useComisionesStore, ['getComisiones']),
    },
    mounted() {
        this.listaComisiones = this.getComisiones()
    }
}
</script>

<template>
    <div>
        <h2>Lista de comisiones:</h2>

        <div v-if="listaComisiones" v-for="comision in listaComisiones" class="container text-start">
            <span>{{ comision.puesto }}</span>
            <hr>
        </div>

    </div>
</template>