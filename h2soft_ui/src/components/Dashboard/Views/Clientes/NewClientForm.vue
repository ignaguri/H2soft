<template>
  <div class="card">
    <div class="header">
      <h4 class="title" v-if="!edit">Agregar nuevo cliente</h4>
      <h4 class="title" v-if="edit">Editar cliente</h4>
    </div>
    <div class="content">
      <form name="new_client_form" @submit.prevent="saveClient">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre/Razón social*"
                      placeholder="Nombre/Razón social"
                      v-model="cliente.razonSocial"
                      :disabled="edit"
                      required>
            </fg-input>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <fg-input type="text"
                      label="CUIL/CUIT*"
                      placeholder="CUIL/CUIT"
                      v-model="cliente.CUIL"
                      required>
            </fg-input>
          </div>
        </div>
          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <label for="tipoCliente">
                  <!--<h4><span class="label label-default">Tipo de cliente*</span></h4>-->
                  <label>Tipo de cliente*</label>
                </label>
                </br>
                <dds id="tipoCliente" v-model="cliente.idTipo"
                     :options="tiposCliente"
                     options-value="idTiposCliente" search-text="Buscar"
                     :placeholder="'Seleccione un tipo'"
                     options-label="nombre"
                     :search="true" :justified="true">
                </dds>
              </div>
            </div>
            <div class="col-md-6">
              <label>Domicilio Fiscal</label>
              <vga ref="address"
                   id="map"
                   classname="form-control border-input"
                   placeholder="Ingrese la dirección"
                   v-on:placechanged="getAddressData"
                   country="ar">
              </vga>
            </div>
          </div>
        <div class="header">
          <h4 class="title">Información de contacto</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre*"
                      placeholder="Nombre"
                      v-model="contacto.nombre"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="email"
                      label="Mail*"
                      placeholder="Dirección de email"
                      v-model="contacto.mail"
                      required>
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="tel"
                      label="Teléfono"
                      placeholder="Teléfono fijo"
                      v-model="contacto.telefono">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="tel"
                      label="Celular"
                      placeholder="Teléfono celular"
                      v-model="contacto.celular">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Observaciones</label>
              <textarea rows="3" class="form-control border-input"
                        placeholder="Alguna observación especial, rol de la persona en la empresa, etc."
                        v-model="contacto.observaciones">
              </textarea>
            </div>
          </div>
        </div>
        <objetivos-list :objetivos="objetivos" :edit="edit" @new_objetivo="captarObjetivo" @delete_objetivo="borrarObjetivo"></objetivos-list>
        <div class="row">
          <div class="header">
            <h4 class="title">Productos en cada Objetivo</h4>
            <label>Indique los productos y cantidades que desea llevar a cada objetivo</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <label>Objetivo</label>
            <div class="btn-group btn-group-justified">
              <dds v-model="productoCantidad.objetivo" :options="objetivos" options-value="nombre" search-text="Buscar" placeholder="Seleccione" options-label="nombre" :multiple="false" :search="true" :justified="true" ></dds>
            </div>
          </div>
          <div class="col-md-3">
            <label>Producto</label>
            <div class="btn-group btn-group-justified">
              <dds v-model="productoCantidad.idproducto" :options="productos" options-value="idProductos" search-text="Buscar" placeholder="Seleccione" options-label="nombre" :multiple="false" :search="true" :justified="true" ></dds>
            </div>
          </div>
          <div class="col-md-3">
            <fg-input type="number"
                      min="0"
                      label="Cantidad"
                      placeholder="Cantidad a llevar"
                      v-model="productoCantidad.cantidad">
            </fg-input>
          </div>
          <div class="col-md-2 col-xs-2 ">
            <div class="" style="margin-top: 30px;">
              <button type="button" class="btn btn-info btn-fill btn-sm" @click="agregar">
                Agregar
              </button>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <pt type="hover" :title="table2.title" :data="table2.data" :columns="table2.columns" :editButton="false" :eraseButton="true" :goButton="false" :erase="quitar" >
            </pt>
          </div>
        </div>
      </div>
        
        <div class="row">
          <div class="text-center">
            <button type="submit" class="btn btn-success btn-fill btn-wd">
              Guardar cliente
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/clientServices'
  import ObjetivosList from './ObjetivosList.vue'
  import apiContratos from 'src/api/services/contratosServices'
  import PaperTableProductos from 'components/UIComponents/PaperTablePlusRemito.vue'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import { select } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  const table2Columns = ['Objetivo', 'Producto', 'Cantidad']

  export default {
    components: {
      ObjetivosList,
      pt: PaperTableProductos,
      vga: VueGoogleAutocomplete,
      dds: select
    },
    props: {
      edit: Boolean,
      idCliente: Number
    },
    data () {
      return {
        cliente: {
          razonSocial: '',
          CUIL: null,
          direccion: '',
          idTipo: null
        },
        contacto: {
          nombre: '',
          telefono: null,
          celular: null,
          mail: '',
          observaciones: ''
        },
        objetivos: [],
        tiposCliente: [],
        address: '',
        productos: [],
        objetivosProducto: [],
        productoCantidad: {
          objetivo: '',
          idproducto: 0,
          cantidad: 0
        },
        table2: {
          title: '',
          subTitle: '',
          columns: [...table2Columns],
          data: []
        }
      }
    },
    mounted () {
      this.cargarProductos()
      this.cargarTiposCliente()
      this.cargarCliente()
    },
    methods: {
      saveClient () {
        if (this.objetivos.length <= 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe agregar al menos 1 objetivo')
          return
        }
        if (this.objetivos.length <= 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe agregar al menos 1 objetivo')
          return
        }
        if (!this.edit) {
          api.postClientes(this, this.cliente, this.contacto, this.objetivos, this.table2.data).then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'Cliente guardado con éxito!')
            } else {
              noti.errorConTexto(this, 'Error', 'Error al eliminar un cliente')
            }
          })
        } else {
          api.editClientes(this, this.idCliente, this.cliente, this.contacto, this.objetivos, this.table2.data).then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'Cliente editado con éxito!')
            } else {
              noti.errorConTexto(this, 'Error', 'Error al editar el cliente')
            }
          })
        }
        this.$parent.isClientList = true
      },
      captarObjetivo (ob) {
        this.objetivos.push(ob)
        this.objetivosProducto.push(ob)
      },
      borrarObjetivo (ob) {
        this.objetivos = this.objetivos.filter(objs => objs.nombre !== ob)
        this.objetivosProducto = this.objetivos.filter(objs => objs.nombre !== ob)
        this.table2.data = this.table2.data.filter(objs => objs.objetivo !== ob)
      },
      cargarCliente () {
        if (this.idCliente !== -1 && this.edit) {
          api.getClienteFull(this, this.idCliente)
            .then(r => {
              this.cliente.razonSocial = r.cliente.razonSocial
              this.cliente.CUIL = r.cliente.CUIL
              this.$refs.address.update(r.cliente.direccion)
              this.cliente.direccion = r.cliente.direccion
              this.cliente.idTipo = r.cliente.idTipo
              this.contacto.nombre = r.contacto.nombre
              this.contacto.mail = r.contacto.mail
              this.contacto.celular = r.contacto.celular
              this.contacto.telefono = r.contacto.telefono
              this.contacto.observaciones = r.contacto.observaciones
              r.objetivos.forEach(o => {
                this.objetivos.push({
                  nombre: o.nombre,
                  direccion: o.direccion,
                  localidad: o.localidad
                })
              })
              if (r.objetivosProductosCantidad.length > 0) {
                r.objetivosProductosCantidad.forEach(opc => {
                  let obj = r.objetivos.find(o => { return o.idObjetivosXCliente === opc.idObjetivo })
                  let prod = this.productos.find(p => { return p.idProductos === opc.idProducto })
                  let objprodcant = {
                    objetivo: obj.nombre,
                    producto: prod.nombre,
                    idProducto: prod.idProductos,
                    cantidad: opc.cantidad
                  }
                  this.table2.data.push(objprodcant)
                })
              }
            })
        }
      },
      cargarTiposCliente () {
        api.getTiposCliente(this)
          .then(r => {
            this.tiposCliente = r
          })
      },
      getAddressData (addressData, placeResultData) {
        console.log('addressData:', addressData)
        console.log('placeresultdata:', placeResultData)
        // let dirAcortada = addressData.route + ', ' + addressData.street_number + ', ' + addressData.locality
        this.cliente.direccion = placeResultData.formatted_address
      },
      agregar () {
        const existe = this.table2.data.find(x => { return (x.nro === this.productoCantidad.idproducto && x.objetivo === this.productoCantidad.objetivo) })
        if (this.productoCantidad.idproducto === 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe seleccionar un producto')
        } else if (this.productoCantidad.cantidad === 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe ingresar la cantidad a dejar')
        } else if (this.productoCantidad.objetivo === '') {
          noti.infoConTexto(this, 'Alerta', 'Debe seleccionar un objetivo')
        } else if (existe !== undefined) {
          noti.infoConTexto(this, 'Alerta', 'El producto seleccionado ya se cargó para el objetivo')
        } else {
          const prod = this.productos.find(p => { return p.idProductos === this.productoCantidad.idproducto })
          const prodSeleccionado = {
            'nro': prod.idProductos,
            'objetivo': this.productoCantidad.objetivo,
            'producto': prod.nombre,
            'cantidad': this.productoCantidad.cantidad,
            'idProducto': prod.idProductos
          }
          this.table2.data.push(prodSeleccionado)
          // this.productosSeleccionados.push({objetivo: this.productoCantidad.objetivo, idProducto: prod.idProductos, nombre: prod.nombre, cantidad: this.productoCantidad.cantidad})
          this.productoCantidad.idproducto = null
          this.productoCantidad.cantidad = 0
          this.productoCantidad.objetivo = null
        }
      },
      quitar (e) {
        let obj = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        let prod = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        const pos = this.table2.data.findIndex(x => x.objetivo === obj && x.producto === prod)
        this.table2.data.splice(pos, 1)
      },
      cargarProductos () {
        apiContratos.getProductosContratos(this)
        .then(res => {
          this.productos = res
        })
      }
    }
  }

</script>
<style>

</style>
