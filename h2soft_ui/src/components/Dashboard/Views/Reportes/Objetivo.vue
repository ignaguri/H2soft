<template>
  <div>
    <div>
        <div class="cuadrado horizontal">
        </div>
        <div class="triangulo horizontal">
        </div>
    </div>		
    <div class="horizontal">
        <!-- <div v-if="objetivo.idestado !== 1" class="ti-truck objetivoActual"></div> -->
        <div v-bind:class="{'horizontal':true, 'circulolleno':(objetivo.idestado === 1), 'circuloborde':(objetivo.idestado !== 1)}"></div>
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
.circuloborde{
    width: 35px;
    height: 35px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
	  border: 5px solid #EB5E28;
    margin-top: 28px;
	  margin-left: 10px;
    margin-right: 15px;
}
.circulolleno {
    width: 35px;
    height: 35px;
     -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #EB5E28;
	  margin-top: 28px;
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
	margin-left: 0px;
	margin-top: 10px;
	padding-top: 58px;
  margin-bottom: 10px;
}
.objetivoActual {
  font-size: 25px;
  transition: .3s;
  color: #68B3C8;
  margin-left: 14px;
  padding-left: 27px;
  transform: scaleX(-1);  
}
</style>
