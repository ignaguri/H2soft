<template>
  <div>
    <div>
        <div class="cuadrado horizontal">
        </div>
        <div class="triangulo horizontal">
        </div>
    </div>		
    <div class="horizontal">
        
        <div v-bind:class="{'horizontal':true, 'visitado':(objetivo.idestado === 1), 'pendiente':(objetivo.idestado !== 1)}">
          <div v-if="objetivo.ultimovisitado === true" class="ti-truck objetivoActual"></div>
        </div>
        <div id="objetivo" class="ct-label ct-horizontal ct-end">
        {{objetivo.nombre}}
        </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {}
  },
  props: {
    objetivo: {}
  },
  mounted () {},
  methods: {}
}
</script>
<style>
.cuadrado {
    width: 40px;
    height: 2px;
    background: #68B3C8;
    margin-top: 45px;
}
.pendiente {
    width: 50px;
    height: 50px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
	  border: 5px solid #EB5E28;
    margin-top: 20px;
	  margin-left: 10px;
    margin-right: 15px;
}
.visitado {
    width: 50px;
    height: 50px;
     -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
     border: 5px solid #41B883;
	  margin-top: 20px;
	  margin-left: 10px;
    margin-right: 15px;
}
.triangulo {
    width: 0;
    height: 0;
    border-left: 7px solid #68B3C8;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    margin-top: 40px;
}
.horizontal {
	float:left;
}
#objetivo {
	margin-left: 4px;
	margin-top: 19px;
	padding-top: 58px;
  margin-bottom: 10px;
}
.objetivoActual {
  font-size: 23px;
  transition: .3s;
  color: #68B3C8;
  margin-left: 14px;
  padding-left: 7px;
  transform: scaleX(-1);  
  padding-top: 6px;
}
</style>
