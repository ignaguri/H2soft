<template>
  <div class="content" >
    <div class="row" >
      <canvas id="signature-pad" class="signature-pad" width=400 height=200 @touchend="save" ></canvas>
    </div>
    <!--
    <div class="row" >
      <button type="button" class="btn btn-danger btn-fill btn-wd" @click="save" >registrar</button>
    </div>
    -->
    <div class="row" >
      <button type="button" class="btn btn-danger btn-fill btn-wd" @click="clear" >Limpiar</button>
    </div>
  </div>
  <!--
  <div class="content">
  <div class="wrapper">
    <img src="http://www.licensing.biz/cimages/c0f1a3a97bc0de97271f9813f7715bb3.png" width=400 height=200 />
    <canvas id="signature-pad" class="signature-pad" width=400 height=200></canvas>
  </div>
  <div>
    <button id="save">Save</button>
    <button id="clear">Clear</button>
  </div>
  </div>
  -->
</template>
<script>
  import SignaturePad from 'signature_pad'
  export default {
    components: {
    },
    data () {
      return {
        imagenFirma: '',
        signaturePad: '',
        esEdicion: false
      }
    },
    mounted () {
      // canvas.addEventListener('touchend', save, false)
      this.obtenerSiganturePad()
    },
    methods: {
      save () {
        let data = this.signaturePad.toDataURL('image/png')
        console.log('save: ')
        this.$parent.firma = data
      },
      clear () {
        console.log('borrar')
        this.signaturePad.clear()
      },
      obtenerSiganturePad () {
        this.signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
          backgroundColor: 'rgba(255, 255, 255, 255)',
          penColor: 'rgb(0, 0, 0)'
        })
      }
    }
  }
  /*
   var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
   backgroundColor: 'rgba(255, 255, 255, 0)',
   penColor: 'rgb(0, 0, 0)'
   })
   var saveButton = document.getElementById('save')
   var cancelButton = document.getElementById('clear')
   saveButton.addEventListener('click', function (event) {
   var data = signaturePad.toDataURL('image/png')
   // Send data to server instead...
   window.open(data)
   })
   cancelButton.addEventListener('click', function (event) {
   signaturePad.clear()
   })
   */
</script>
<style>
</style>
