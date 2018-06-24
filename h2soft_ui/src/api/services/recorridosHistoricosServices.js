import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA RECORRIDOS
export default {
  getRecorridosAsignados (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorrido-historico', authHeader)
      .then(res => {
        return res.body.data
      })
      .catch(error => {
        console.log('algo falló en el get' + JSON.stringify(error))
      })
  },
  getRecorridosAsignadosParaHoy (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const tomorrow = new Date(hoy)
    tomorrow.setDate(hoy.getDate() + 1)
    return context.$http.get(API_URL + 'recorrido-historico/?fechaAsignacion[$gte]=' + hoy.toISOString() + '&fechaAsignacion[$lt]=' + tomorrow.toISOString(), authHeader)
      .then(res => {
        return res.body.data
      })
      .catch(error => {
        console.log('algo falló en el get' + JSON.stringify(error))
      })
  },
  getRecorridoAsignadoXId (context, idRecorridoAsignado) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoAsignado, authHeader)
  },
  getRecorridosAsignadosXEmpleado (context, idEmpleado) {
    const authHeader = {headers: auth.getAuthHeader()}
    const hoy = new Date()
    let ayer = new Date(hoy)
    ayer.setDate(hoy.getDate() - 1)
    return context.$http.get(API_URL + 'recorrido-historico/?idEmpleadoAsignado=' + idEmpleado + '&fechaAsignacion[$gte]=' + ayer.toISOString(), authHeader)
  },
  getRecorridosIniciadosXEmpleado (context) {
    const idEmpleado = JSON.parse(sessionStorage.getItem('user')).idEmpleado
    const authHeader = {headers: auth.getAuthHeader()}
    let inicioSemana = new Date()
    inicioSemana.setDate(inicioSemana.getDate() - 7)
    return context.$http.get(API_URL + 'recorrido-historico/?idEstado=2&idEmpleadoAsignado=' + idEmpleado + '&fechaAsignacion[$gte]=' + inicioSemana.toISOString(), authHeader)
    .then(res => {
      return res.body.data
    })
    .catch(error => {
      console.log('algo falló en el get recorridos' + JSON.stringify(error))
    })
  },
  getRecorridosAsignadosUltimaSemanaXEmpleado (context, idEmpleado) {
    const authHeader = {headers: auth.getAuthHeader()}
    const hoy = new Date()
    let inicioSemana = new Date()
    inicioSemana.setDate(inicioSemana.getDate() - 7)
    return context.$http.get(API_URL + 'recorrido-historico/?idEmpleadoAsignado=' + idEmpleado + '&fechaAsignacion[$gt]=' + inicioSemana.toISOString() + '&fechaAsignacion[$lte]=' + hoy.toISOString(), authHeader)
      .then(res => {
        return res.body.data
      })
      .catch(error => {
        console.log('algo falló en el get recorridos' + JSON.stringify(error))
      })
  },
  getDetallesRecorridoAsignado (context, idRecorridoAsignado) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'detalle-recorrido-historico/?idRecorridoHistorico=' + idRecorridoAsignado, authHeader)
      .then(res => {
        return res.body.data
      })
      .catch(error => {
        console.log('algo falló en el get de detalle' + JSON.stringify(error))
      })
  },
  getDetalleRecorridoAsignado (context, idDetalleRecorridoHistorico) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'detalle-recorrido-historico/?idDetalleRecorridoHistorico=' + idDetalleRecorridoHistorico, authHeader)
  },
  getDetalleRecorridosAsignadosXRemito (context, idRemito) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'detalle-recorrido-historico/?idRemito=' + idRemito, authHeader)
      .then(res => {
        return res.body.data[0]
      })
      .catch(error => {
        console.log('algo falló en el get' + JSON.stringify(error))
      })
  },
  getRecorrido (context, idRecorrido) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorridos/?idRecorridos=' + idRecorrido, authHeader)
  },
  /*
   getDetalleRecorrido (context, idRecorrido) {
   return context.$http.get(API_URL + 'detalle-recorrido/?idRecorrido=' + idRecorrido, authHeader)
   },
   */
  getObjetivoXId (context, idObjetivo) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'objetivos-x-cliente/?idObjetivosXCliente=' + idObjetivo, authHeader)
  },
  getDireccionXNombre (context, nombre) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'objetivos-x-cliente/?nombre=' + nombre, authHeader)
      .then(ob => {
        return (ob.body.data[0].direccion)
      })
  },
  editarDetalleRecorridoHistorico (context, detalleRecorridoHistorico) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.patch(API_URL + 'detalle-recorrido-historico/' + detalleRecorridoHistorico.idDetalleRecorridoHistorico, detalleRecorridoHistorico, authHeader)
      .then(det => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  },
  mostrarRecorridoEnMapa (context, data) {
    // console.table(data)
    return this.generarURLMaps(context, data)
  },
  async generarURLMaps (context, data) {
    let direcciones = []
    for (let i = 0; i < data.length; i++) {
      await this.getDireccionXNombre(context, data[i].objetivo)
        .then(ob => {
          direcciones.push(ob)
        })
    }
    let url = 'https://www.google.com/maps/dir/?api=1&'
    url += 'origin=Abreu+de+Albornoz+467%2C+Cordoba%2C+Cordoba'// San+Luis+188%2C+Cordoba%2C+Cordoba'
    url += '&'
    url += 'destination=Abreu+de+Albornoz+467%2C+Cordoba%2C+Cordoba'// San+Luis+188%2C+Cordoba%2C+Cordoba'
    url += '&'
    url += 'travelmode=driving'
    url += '&'
    url += 'waypoints='// Buenos+Aires+750%2C+Cordoba%2C+Cordoba%7CObispo+Trejo+332%2C+Cordoba%2C+Cordoba'
    for (let i = 0; i < direcciones.length; i++) {
      url += parsearDireccion(direcciones[i])
      if (i !== direcciones.length - 1) {
        url += '%7C'
      }
    }
    return url
  },
  objetivosPorTemporada (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorrido-historico?$select[]=idTemporada&$select[]=idDia', authHeader)
      .then(historicos => {
        historicos = historicos.body.data
        let promesas = []
        historicos.forEach(recorrido => {
          const dia = recorrido.idDia
          const temporada = recorrido.idTemporada
          promesas.push(context.$http.get(API_URL + 'detalle-recorrido-historico/?idDetalleRecorridoHistorico=' + recorrido.idRecorridosHistoricos, authHeader)
            .then(detRem => {
              detRem.body.data.push({dia: dia})
              detRem.body.data.push({temporada: temporada})
              return detRem.body.data
            }))
        })
        return Promise.all(promesas)
      })
      .then(detallesRecorridosHistoricos => {
        const cantidades = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
          12: 0,
          13: 0,
          14: 0
        }
        detallesRecorridosHistoricos.forEach(detalles => {
          const dia = detalles.find(d => d.dia).dia
          const temporada = detalles.find(d => d.temporada).temporada
          if (temporada === 1) {
            cantidades[dia] += 1
          } else {
            cantidades[dia + 7] += 1
          }
        })
        return cantidades
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del rec historico' + JSON.stringify(error))
      })
  }
}

const parsearDireccion = dir => {
  return dir.replace(/\s/g, '+')
    .replace(/,/g, '%2C')
}
