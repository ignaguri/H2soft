<template>
  <div>
    <div>
        <div class="cuadrado horizontal">
        </div>
        <div class="triangulo horizontal">
        </div>
    </div>		
    <div class="horizontal">
        <div class="circuloborde horizontal">
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
    margin-top: 49px;
}
.circuloborde{
     width: 50px;
     height: 50px;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
     border-radius: 50%;
	 border: 5px solid #EB5E28;
     margin-top: 25px;
	 margin-left: 10px;
     margin-right: 15px;
}
.circulolleno {
     width: 50px;
     height: 50px;
     -moz-border-radius: 50%;
     -webkit-border-radius: 50%;
     border-radius: 50%;
     background: #5cb85c;
	 margin-top: 25px;
	 margin-left: 10px;
     margin-right: 15px;
}
.triangulo {
    width: 0;
    height: 0;
    border-left: 7px solid #68B3C8;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    margin-top: 44px;
}
.horizontal {
	float:left;
}
#objetivo {
	margin-left: 10px;
	margin-top: 10px;
	padding-top: 80px;
    margin-bottom: 10px;
}
</style>
