<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="header">
            <h4 class="title">Estado de caja</h4>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="col-md-4 text-center">
                    <h5>Efectivo</h5>
                    <h4 style="margin-top: 0px;" class="">$ {{this.efectivoo}}</h4>
                  </div>
                  <div class="col-md-4 text-center">
                    <h5>Cheque</h5>
                    <h4 style="margin-top: 0px;" class="">$ {{this.chequee}}</h4>
                  </div>
                  <div class="col-md-4 text-center">
                    <h5>Banco</h5>
                    <h4 style="margin-top: 0px;" class="">$ {{this.transferenciaa}}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import apiIngresoEgreso from 'src/api/services/ingresosEgresosServices'

  export default {
    components: {},
    data () {
      return {
        efectivoo: 0,
        chequee: 0,
        transferenciaa: 0
      }
    },
    mounted () {
      this.getTotales()
    },
    props: {},
    methods: {
      getTotales () {
        apiIngresoEgreso.getTotalPorTipoDePagoCobro(this)
          .then(totales => {
            this.efectivoo = totales.efectivo
            this.chequee = totales.cheque
            this.transferenciaa = totales.transferencia
          })
      }
    }
  }

</script>
<style>

</style>
