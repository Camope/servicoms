<script>
import { mapActions, mapState } from 'pinia'
import { useSolicitantesStore } from '@/stores/solicitantes'

export default {
  props: {
    comisionId: {
      type: String,
      default: ""
    },
  },
  components: {},
  emits: [],
  data() {
    return {
      solicitantes: null,
    }
  },
  updated() {

  },
  created() {
  },
  mounted() {
    this.solicitantes = this.getSolicitantesPorComision(this.comisionId)
    // console.log("comisionId: " + this.comisionId)
    // console.log(this.solicitantes)
  },
  computed: {
  
  },
  methods: {
    ...mapActions(useSolicitantesStore, ['getSolicitantesPorComision']),
  }
}
</script>

<template>
    <div class="card">
        <DataTable :value="solicitantes" scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
            <!-- <Column field="tip" header="TIP"></Column> -->
            <Column field="tip" header="TIP"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="empleo" header="Empleo"></Column>
            <Column field="email" header="e-mail"></Column>
        </DataTable>
    </div>
</template>