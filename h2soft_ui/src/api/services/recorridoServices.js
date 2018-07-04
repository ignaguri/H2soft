import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  test () {
    const authHeader = {headers: auth.getAuthHeader()}
    console.log('api de recorridos', API_URL, authHeader)
  },
  getTemporadas (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'temporada', authHeader).then(res => {
      return res.body.data
    })
  },
  getDias (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'dias', authHeader).then(res => {
      return res.body.data
    })
  },
  getTurnos (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'turnos', authHeader).then(res => {
      return res.body.data
    })
  },
  getFrecuencias (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(API_URL + 'frecuencia-recorridos', authHeader)
      .then(res => {
        return res.body.data
      })
  },
  getClientes (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(API_URL + 'clientes' + '/?activo=' + 1, authHeader)
      .then(res => {
        return res.body.data
      })
  },
  getObjetivos (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(
        API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id + '&activo=' + 1,
        authHeader
      )
      .then(res => {
        return res.body.data
      })
  },
  postRecorrido (context, recorrido, detalle) {
    const authHeader = {headers: auth.getAuthHeader()}
    if (recorrido.idRecorridos === null) {
      delete recorrido.idRecorridos
      recorrido.activo = true
      // console.log('recorrido sin id', recorrido)
      return context.$http
        .post(API_URL + 'recorridos', recorrido, authHeader)
        .then(recorridoInsertado => {
          // console.log('inserté el recorrido', recorridoInsertado)
          detalle.idRecorrido = recorridoInsertado.body.idRecorridos
          return context.$http.post(
            API_URL + 'detalle-recorrido',
            detalle,
            authHeader
          )
        })
        .then(detalleInsertado => {
          // console.log('inserté el detalle de recorrido', detalleInsertado)
          return [detalle.idRecorrido]
        })
        .catch(error => {
          console.log('error insertando recorrido', error)
          return [false, error]
        })
    } else {
      // console.log('agregando un objetivo al recorrido', recorrido)
      return context.$http.get(API_URL + 'detalle-recorrido' + '?idRecorrido=' + recorrido.idRecorridos +
        '&idObjetivo=' + detalle.idObjetivo, authHeader)
        .then(detalleExistente => {
          // console.log('ya existe ese objetivo en el recorrido?', detalleExistente.body.data)
          if (detalleExistente.body.data.length) {
            throw new Error('Objetivo ya existente en el recorrido')
          }
          detalle.idRecorrido = recorrido.idRecorridos
          return context.$http.post(API_URL + 'detalle-recorrido', detalle, authHeader)
        })
        .then(detalleInsertado => {
          // console.log('updatié el detalle de recorrido', detalleInsertado)
          return context.$http.get(API_URL + 'recorrido-historico/' + '?idRecorrido=' +
            recorrido.idRecorridos + '&fechaAsignacion[$gte]=' + new Date().toISOString(), authHeader)
        })
        .then(recorridosAsignados => {
          // console.log('hay recorridos asignados de este recorrido?', recorridosAsignados.body.data)
          const hayRecorridosAsignados = Boolean(recorridosAsignados.body.data.length)
          return [detalle.idRecorrido, hayRecorridosAsignados]
        })
        .catch(error => {
          console.log('error updating recorrido', error)
          return [false, error.message]
        })
    }
  },
  getRecorridos (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorridos', authHeader).then(r => {
      return r.body.data
    })
  },
  getRecorrido (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(API_URL + 'recorridos/' + id, authHeader)
      .then(r => {
        return r.body
      })
  },
  getRecorridosFull (context, soloActivos = true) {
    const authHeader = {headers: auth.getAuthHeader()}
    // TODO: guardar dia, freq, turno y temp en una variable y comparar con eso
    let info = {}
    let total = []
    let promesas = []
    const activos = soloActivos ? '/?activo=1' : ''
    return context.$http
      .get(API_URL + 'recorridos' + activos, authHeader)
      .then(r => {
        r.body.data.forEach(re => {
          info = {}
          info.recorrido = re.idRecorridos
          info.dia = re.idDia
          info.frecuencia = re.idFrecuencia
          info.turno = re.idTurno
          info.temporada = re.idTemporada
          promesas.push(
            this.populateCamposRecorrido(context, info).then(d => total.push(d))
          )
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return total
      })
      .catch(err => {
        console.error('Error en getRecorridosFull', err)
        return false
      })
  },
  populateCamposRecorrido (context, info) {
    const authHeader = {headers: auth.getAuthHeader()}
    let res = {}
    res.recorrido = info.recorrido
    return context.$http
      .get(API_URL + 'dias/' + info.dia, authHeader)
      .then(dia => {
        res.dia = dia.body.nombre
        return context.$http.get(
          API_URL + 'frecuencia-recorridos/' + info.frecuencia,
          authHeader
        )
      })
      .then(freq => {
        res.frecuencia = freq.body.nombre
        return context.$http.get(API_URL + 'turnos/' + info.turno, authHeader)
      })
      .then(turno => {
        res.turno = turno.body.nombre
        return context.$http.get(
          API_URL + 'temporada/' + info.temporada,
          authHeader
        )
      })
      .then(temp => {
        res.temporada = temp.body.nombre
        return this.checkIfAsignado(context, info.recorrido)
      })
      .then(asignado => {
        res.asignado = asignado
        return res
      })
      .catch(error => {
        console.log('error en el populateCamposRecorrido', error)
        return false
      })
  },
  getDetalleRecorrido (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(API_URL + 'detalle-recorrido' + '/?idRecorrido=' + id, authHeader)
      .then(r => {
        return r.body.data
      })
  },
  getDetalleRecorridosFull (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    let info = {}
    let total = []
    let promesas = []
    return context.$http
      .get(API_URL + 'detalle-recorrido' + '/?idRecorrido=' + id, authHeader)
      .then(r => {
        r.body.data.forEach(re => {
          info = {}
          info.detalleRecorrido = re.idDetalleRecorrido
          info.recorrido = re.idRecorrido
          info.objetivo = re.idObjetivo
          info.orden = re.orden
          promesas.push(
            this.populateCamposDetalleRecorrido(context, info).then(d =>
              total.push(d)
            )
          )
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return total
      })
  },
  populateCamposDetalleRecorrido (context, info) {
    const authHeader = {headers: auth.getAuthHeader()}
    let res = {}
    res.detalleRecorrido = info.detalleRecorrido
    res.recorrido = info.recorrido
    res.orden = info.orden
    return context.$http
      .get(API_URL + 'objetivos-x-cliente/' + info.objetivo, authHeader)
      .then(objetivo => {
        res.idObjetivo = objetivo.body.idObjetivosXCliente
        res.objetivo = objetivo.body.nombre
        res.direccion = objetivo.body.direccion
        res.localidad = objetivo.body.localidad
        return context.$http.get(
          API_URL + 'clientes/' + objetivo.body.idCliente,
          authHeader
        )
      })
      .then(cliente => {
        res.cliente = cliente.body.razonSocial
        return res
      })
      .catch(error => {
        console.log('error en el getRecorridosFull', error)
        return false
      })
  },
  getObjetivosSinPlanificar (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    let objetivos = {}
    let planificados = {}
    let filtrados = {}
    return context.$http
      .get(API_URL + 'objetivos-x-cliente' + '/?activo=' + 1, authHeader)
      .then(res => {
        objetivos = res.body.data
        return context.$http.get(API_URL + 'detalle-recorrido', authHeader)
      })
      .then(planned => {
        planificados = planned.body.data
        filtrados = objetivos.filter(ob => {
          let flag = true
          planificados.forEach(pl => {
            if (pl.idObjetivo === ob.idObjetivosXCliente) {
              flag = false
            }
          })
          return flag
        })
        let promesas = []
        filtrados.forEach(f => {
          promesas.push(
            context.$http
              .get(API_URL + 'clientes/' + f.idCliente, authHeader)
              .then(c => {
                f.cliente = c.body.razonSocial
              })
          )
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return filtrados
      })
  },
  deleteObjetivoFromRecorrido (context, objetivo, recorrido) {
    const authHeader = {headers: auth.getAuthHeader()}
    // TODO: agregar el nombre del cliente como parametro por si 2 objetivos se llaman igual
    return context.$http
      .get(API_URL + 'objetivos-x-cliente' + '/?nombre=' + objetivo, authHeader)
      .then(obj => {
        let idObjetivo = obj.body.data[0].idObjetivosXCliente
        if (idObjetivo !== undefined) {
          return context.$http.delete(
            API_URL +
            'detalle-recorrido' +
            '/?idObjetivo=' +
            idObjetivo +
            '&idRecorrido=' +
            recorrido,
            authHeader
          )
            .then(o => {
              const hoy = new Date()
              hoy.setDate(hoy.getDate() - 1)
              return context.$http.get(API_URL + 'recorrido-historico/?fechaAsignacion[$gte]=' + hoy.toISOString() + '&idEstado=1', authHeader)
                .then(hist => {
                  hist = hist.body.data
                  hist.forEach(historicos => {
                    let idHistorico = historicos.idRecorridosHistoricos
                    return context.$http.get(API_URL + 'detalle-recorrido-historico/?idRecorridoHistorico=' + idHistorico, authHeader)
                      .then(detallesHistorico => {
                        detallesHistorico = detallesHistorico.body.data
                        detallesHistorico.forEach(detalleHistorico => {
                          if (detalleHistorico.idObjetivo === idObjetivo) {
                            return context.$http.delete(API_URL + 'detalle-recorrido-historico' + '/?idDetalleRecorridoHistorico=' + detalleHistorico.idDetalleRecorridoHistorico, authHeader)
                              .then(r => {
                                console.log('BORRADO DETALLE' + detalleHistorico.idDetalleRecorridoHistorico)
                              })
                              .catch('ERROR AL BORRAR DETALLE:' + detalleHistorico.idDetalleRecorridoHistorico)
                          }
                        })
                      })
                  })
                })
            })
        } else {
          console.log('No se encontró el id del objetivo buscado')
          return false
        }
      })
      .then(r => {
        return true
      })
      .catch(error => {
        console.log('error al eliminar objetivo de recorrido', error)
        return false
      })
  },
  deleteRecorrido (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .delete(API_URL + 'detalle-recorrido' + '?idRecorrido=' + id, authHeader)
      .then(() => {
        return context.$http.get(
          API_URL +
          'recorrido-historico' +
          '?idRecorrido=' +
          id +
          '&fechaAsignacion[$gte]=' +
          new Date().toISOString(),
          authHeader
        )
      })
      .then(recorridosHistoricos => {
        recorridosHistoricos = recorridosHistoricos.body.data
        let promesas = []
        recorridosHistoricos.forEach(r =>
          promesas.push(
            context.$http
              .delete(
                API_URL +
                'detalle-recorrido-historico' +
                '?idRecorridoHistorico=' +
                r.idRecorridosHistoricos,
                authHeader
              )
              .then(() => {
                return context.$http.delete(
                  API_URL + 'recorrido-historico/' + r.idRecorridosHistoricos,
                  authHeader
                )
              })
              .then(recorridoHistoricoBorrado => {
                return recorridoHistoricoBorrado.body
              })
          )
        )
        return Promise.all(promesas)
      })
      .then(historicosBorrados => {
        return context.$http.patch(
          API_URL + 'recorridos/' + id,
          {activo: 0},
          authHeader
        )
      })
      .then(r => {
        return true
      })
      .catch(error => {
        console.error('Error al borrar el recorrido', error)
        return false
      })
  },
  getEmpleados (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'empleados', authHeader).then(res => {
      return res.body.data
    })
  },
  getRepartidores (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(API_URL + 'users', authHeader)
      .then(users => {
        return users.body.data.filter(u => u.idRol === 3)
      })
      .then(filtrados => {
        let promesas = []
        filtrados.forEach(u =>
          promesas.push(
            context.$http
              .get(API_URL + 'empleados/' + u.idEmpleado, authHeader)
              .then(r => r.body)
          )
        )
        return Promise.all(promesas)
      })
      .then(repartidores => {
        return repartidores
      })
  },
  postAsignacion (context, asignacion, obviarAdvertencias = false) {
    if (obviarAdvertencias) {
      return this.postAsignacionEfectiva(context, asignacion)
    } else {
      return this.calcularDiasAsignacion(context, asignacion)
        .then(diasAsignacion => {
          return this.checkIfAsignable(context, asignacion, diasAsignacion)
        })
        .then(isAsignable => {
          if (isAsignable.noConflict) {
            return this.postAsignacionEfectiva(context, asignacion)
          }
          return isAsignable
        })
        .catch(err => {
          console.log('Error en post asignacion', err)
          return false
        })
    }
  },
  postAsignacionEfectiva (context, asignacion) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .post(API_URL + 'recorrido-historico/asignar', asignacion, authHeader)
      .then(asignado => {
        return {asignado: true}
      })
      .catch(error => {
        console.log('error asignando el recorrido', error)
        return false
      })
  },
  calcularDiasAsignacion (context, asignacion) {
    const authHeader = {headers: auth.getAuthHeader()}
    const desde = asignacion.fechaDesde.split('/')
    const fechaDesde = new Date(desde[2], desde[1] - 1, desde[0])
    fechaDesde.setHours(0, 0, 0, 0)
    const hasta = asignacion.fechaHasta.split('/')
    const fechaHasta = new Date(hasta[2], hasta[1] - 1, hasta[0])
    fechaHasta.setHours(0, 0, 0, 0)

    return context.$http
      .get(API_URL + 'recorridos/' + asignacion.recorrido, authHeader)
      .then(recorrido => {
        const frecuencia = this.getFrecuencia(
          recorrido.body.idFrecuencia,
          fechaDesde,
          fechaHasta
        )

        const aux = this.getDiaAsignacion(recorrido.body.idDia, fechaDesde)
        let fechasAsignacion = []
        for (let i = 0; i < frecuencia; i++) {
          if (aux < fechaHasta) {
            fechasAsignacion.push(aux.toISOString())
          } else {
            break
          }
          aux.setDate(aux.getDate() + 7)
        }
        return fechasAsignacion
      })
  },
  getFrecuencia (idFrecuencia, fechaDesde, fechaHasta) {
    // retorna cuantas iteraciones han de hacerse según la frecuencia
    // por ej: id 1 = 1 vez por semana -> 4 iteraciones
    // el día inicial, la semana siguiente, la otra semana y la ultima semana de ese mes
    const meses = this.cantMesesEntre(fechaHasta, fechaDesde)
    switch (idFrecuencia) {
      case 1:
        return Math.round(4 * meses)
      case 2:
        return Math.round(2 * meses)
      case 3:
        return Math.round(1 * meses)
    }
  },
  cantMesesEntre (hasta, desde) {
    let diff = (hasta.getTime() - desde.getTime()) / 1000
    diff /= 60 * 60 * 24 * 7 * 4
    // return Math.abs(Math.round(diff));
    return Math.abs(diff)
  },
  getDiaAsignacion (dia, fechaDesde) {
    // Sunday - Saturday : 0 - 6
    const date = new Date(fechaDesde)

    date.setHours(0)
    if (date.getDay() <= dia) {
      date.setDate(date.getDate() + (dia - date.getDay()))
      return date
    } else {
      date.setDate(date.getDate() + (dia + 7 - date.getDay()))
      return date
    }
  },
  checkIfAsignable (context, asignacion, diasAsignacion) {
    const {recorrido, empleado, fechaDesde, fechaHasta} = asignacion
    let recorridosAsignadosDelRango
    return this.getRecorridosCoincidentesSinTurno(context, {
      recorrido,
      fechaDesde,
      fechaHasta,
      diasAsignacion
    })
      .then(recorridosCoincidentesSinTurno => {
        recorridosAsignadosDelRango = recorridosCoincidentesSinTurno
        return this.checkAsignacionObjetivos(context, recorrido, recorridosAsignadosDelRango)
      })
      .then(objetivosYaAsignados => {
        // console.log('los objetivos ya estan asignados?', objetivosYaAsignados)
        if (objetivosYaAsignados) {
          const error = {
            restrictivo: true,
            message: 'Ya existen recorridos asignados que visitan alguno de los objetivos para ese rango de fechas. Objetivos:',
            data: objetivosYaAsignados.map(o => o.idObjetivo)
          }
          throw error
        }
        return this.checkVigenciaContratos(context, recorrido, diasAsignacion)
      })
      .then(vigenciaContratos => {
        if (!vigenciaContratos[0]) {
          const error = {
            restrictivo: true,
            message: vigenciaContratos[1],
            data: vigenciaContratos[2]
          }
          throw error
        }
        return this.getRecorridosCoincidentes(context, {
          recorrido,
          fechaDesde,
          fechaHasta,
          diasAsignacion
        }) // return this.checkDisponibilidadRepartidor(empleado, recorridosAsignadosDelRango)
      })
      .then(recorridosCoincidentes => {
        recorridosAsignadosDelRango = recorridosCoincidentes
        return this.checkDisponibilidadRepartidor(empleado, recorridosAsignadosDelRango)
        // return this.checkAsignacionObjetivos(context, recorrido, recorridosAsignadosDelRango)
      })
      .then(repartidorOcupado => {
        // console.log('el repartidor esta ocupado', repartidorOcupado)
        if (repartidorOcupado) {
          const error = {
            restrictivo: false,
            message: 'El repartidor ya tiene recorridos asignados para ese rango de fechas. Recorridos:',
            data: [...repartidorOcupado]
          }
          throw error
        }
        return this.checkCantidadCamiones(context, recorridosAsignadosDelRango)
      })
      .then(cantCamiones => {
        // console.log('hay más recorridos que camiones?', cantCamiones)
        if (cantCamiones) {
          const error = {
            restrictivo: false,
            message: 'Los recorridos a asignar para ese día y turno exceden la cantidad de camiones disponibles. Recorridos:',
            data: [...cantCamiones] // cantCamiones = recorridos conflictivos
          }
          throw error
        }
        return {noConflict: true}
      })
      .catch(error => {
        if (error.hasOwnProperty('restrictivo')) return error
        throw error
      })
  },
  checkCantidadCamiones (context, recorridos) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'camiones', authHeader)
      .then(camiones => {
        const recorridosPorFecha = groupBy(recorridos, 'fechaAsignacion')
        const recorridosConflictivos = Object.values(recorridosPorFecha).filter(recorridos => recorridos.length >= camiones.body.data.length)
        const result = flatten(recorridosConflictivos).map(c => c.idRecorrido)
        return recorridosConflictivos.length ? new Set(result) : false
      })
      .catch(err => {
        throw err
      })
  },
  checkDisponibilidadRepartidor (empleado, recorridos) {
    if (recorridos.length) {
      const recorridosDeEseEmpleado = recorridos.filter(
        rec => rec.idEmpleadoAsignado === empleado
      )
      if (recorridosDeEseEmpleado.length) {
        const recorridosEnConflicto = new Set(recorridosDeEseEmpleado.map(recorrido => recorrido.idRecorrido))
        return Promise.resolve(recorridosEnConflicto)
      } else {
        return Promise.resolve(false)
      }
    }
    return Promise.resolve(false)
  },
  checkAsignacionObjetivos (context, idRecorrido, recorridos) {
    const authHeader = {headers: auth.getAuthHeader()}
    // console.log('recorridos coincidentes', recorridos)
    // console.log('recorrido a (re)asignar', idRecorrido)
    const recorridosFiltered = recorridos.filter(rec => rec.idRecorrido !== idRecorrido)
    // console.log('recorridos coincidente en fechas sin incluir los del recorrido a asignar', recorridosFiltered)
    const getObjetivosPlanificados = recorridosFiltered.map(rec => context.$http.get(API_URL + 'detalle-recorrido-historico/' + '?idRecorridoHistorico=' +
      rec.idRecorridosHistoricos, authHeader) // estos son los que se reasignarian
      .then(response => response.body.data))
    const getObjetivosAPlanificar = context.$http.get(API_URL + 'detalle-recorrido/' + '?idRecorrido=' + idRecorrido, authHeader).then(response => response.body.data)
    return Promise.all([Promise.all(getObjetivosPlanificados), getObjetivosAPlanificar])
      .then(([objetivosPlanificados, objetivosAPlanificar]) => {
        objetivosPlanificados = flatten(objetivosPlanificados)
        const colisiones = objetivosAPlanificar.filter(aPlanificar => objetivosPlanificados.some(planificado => planificado.idObjetivo === aPlanificar.idObjetivo))
        if (colisiones.length) {
          const objetivosEnConflicto = colisiones.map(objetivo => ({idObjetivo: objetivo.idObjetivo}))
          return objetivosEnConflicto
        } else {
          return false
        }
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  },
  checkVigenciaContratos (context, idRecorrido, diasAsignacion) {
    const authHeader = {headers: auth.getAuthHeader()}
    let clientes
    return context.$http.get(API_URL + 'detalle-recorrido/' + '?idRecorrido=' + idRecorrido + '&$select[]=idObjetivo', authHeader)
      .then(objetivos => {
        objetivos = objetivos.body.data
        const promesas = objetivos.map(o => context.$http.get(API_URL + 'objetivos-x-cliente/' + o.idObjetivo + '?$select[]=idCliente', authHeader)
          .then(res => res.body))
        return Promise.all(promesas)
      })
      .then(clientesBD => {
        clientes = clientesBD.reduce((acc, cur) => {
          if (!acc.find(c => c.idCliente === cur.idCliente)) {
            acc.push(cur)
          }
          return acc
        }, [])
        const promesas = clientes.map(c => context.$http.get(API_URL + 'contratos/' + '?idCliente=' + c.idCliente, authHeader)
          .then(res => res.body.data))
        return Promise.all(promesas)
      })
      .then(contratos => {
        const clientesSinContrato = contratos.reduce((acc, cur, i) => {
          if (!cur.length) acc.push(clientes[i].idCliente)
          return acc
        }, [])
        if (clientesSinContrato.length) {
          return [false, 'Cliente/s sin contrato firmado:', clientesSinContrato]
        }
        const contratosLimpios = contratos.reduce((acc, cur) => {
          if (cur.length) acc.push(cur)
          return acc
        }, [])
        const contratosFueraDeVigencia = contratosLimpios.filter(contratosPorCliente => {
          const fueraDeVigencia = contratosPorCliente.filter(c => diasAsignacion.some(fecha => fecha > c.fechaVigenciaHasta))
          return fueraDeVigencia.length === contratosPorCliente.length
        })
        if (contratosFueraDeVigencia.length) {
          const clientesFallutos = flatten(contratosFueraDeVigencia).map(c => c.idCliente)
          return [false, 'Hay contratos no vigentes para ese rango de fechas, cliente/s:', clientesFallutos]
        }
        return [true]
      })
      .then(resultado => {
        return resultado
      })
      .catch(err => {
        // console.error(err)
        throw err
      })
  },
  getRecorridosCoincidentes (context, {recorrido, fechaDesde, fechaHasta, diasAsignacion}) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorridos/' + recorrido, authHeader)
      .then(recorrido => {
        const desde = fechaDesde.split('/')
        fechaDesde = new Date(desde[2], desde[1] - 1, desde[0])
        const hasta = fechaHasta.split('/')
        fechaHasta = new Date(hasta[2], hasta[1] - 1, hasta[0])
        return context.$http.get(
          API_URL +
          'recorrido-historico/' +
          '?idDia=' +
          recorrido.body.idDia +
          '&idTurno=' +
          recorrido.body.idTurno +
          '&fechaAsignacion[$gte]=' +
          fechaDesde.toISOString() +
          '&fechaAsignacion[$lt]=' +
          fechaHasta.toISOString(),
          authHeader
        )
      })
      .then(recorridosAsignados => {
        const recorridosCoincidentes = recorridosAsignados.body.data.filter(r =>
          diasAsignacion.find(dia => r.fechaAsignacion)
        )
        // console.log('Hay', recorridosCoincidentes.length, 'recorridos para ese rango de fecha, con ese día y ese turno')
        return recorridosCoincidentes
      })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  getRecorridosCoincidentesSinTurno (context, {recorrido, fechaDesde, fechaHasta, diasAsignacion}) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'recorridos/' + recorrido, authHeader)
      .then(recorrido => {
        const desde = fechaDesde.split('/')
        fechaDesde = new Date(desde[2], desde[1] - 1, desde[0])
        const hasta = fechaHasta.split('/')
        fechaHasta = new Date(hasta[2], hasta[1] - 1, hasta[0])
        return context.$http.get(
          API_URL +
          'recorrido-historico/' +
          '?idDia=' +
          recorrido.body.idDia +
          // '&idTurno=' +
          // recorrido.body.idTurno +
          '&fechaAsignacion[$gte]=' +
          fechaDesde.toISOString() +
          '&fechaAsignacion[$lt]=' +
          fechaHasta.toISOString(),
          authHeader
        )
      })
      .then(recorridosAsignados => {
        const recorridosCoincidentesSinTurno = recorridosAsignados.body.data.filter(r =>
          diasAsignacion.find(dia => r.fechaAsignacion)
        )
        // console.log('Hay', recorridosCoincidentes.length, 'recorridos para ese rango de fecha, con ese día y ese turno')
        return recorridosCoincidentesSinTurno
      })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  checkIfAsignado (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    const ayer = new Date()
    ayer.setDate(ayer.getDate() - 1)
    const enUnMes = new Date(ayer)
    enUnMes.setDate(ayer.getDate() + 30)
    return context.$http
      .get(
        API_URL +
        'recorrido-historico/' +
        '?idRecorrido=' +
        id +
        '&fechaAsignacion[$gte]=' +
        ayer.toISOString() +
        '&fechaAsignacion[$lt]=' +
        enUnMes.toISOString(),
        authHeader
      )
      .then(r => {
        return context.$http.get(
          API_URL + 'empleados/' + r.body.data[0].idEmpleadoAsignado,
          authHeader
        )
      })
      .then(emple => {
        return {nombre: emple.body.nombre, apellido: emple.body.apellido}
      })
      .catch(() => {
        return false
      })
  },
  getAsignacionesFuturas (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    const ayer = new Date()
    ayer.setDate(ayer.getDate() - 1)

    return context.$http.get(API_URL + 'recorrido-historico/' + '?idRecorrido=' +
      id + '&fechaAsignacion[$gt]=' + ayer.toISOString(), authHeader)
      .then(recorridos => {
        recorridos = recorridos.body.data
        const agrupados = groupBy(recorridos, 'idEmpleadoAsignado')
        let promesas = []
        Object.keys(agrupados).forEach(k => {
          let {0: first, length: l, [l - 1]: last} = agrupados[k]
          promesas.push(context.$http.get(API_URL + 'empleados/' + k, authHeader)
            .then(emple => Object.assign({}, {first}, {last}, {
              empleado: {
                nombre: emple.body.nombre,
                apellido: emple.body.apellido
              }
            })))
        })
        return Promise.all(promesas)
      })
      .then(recorridosFuturos => recorridosFuturos)
      .catch(() => {
        return false
      })
  },
  getMotivosReasignacion (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http
      .get(API_URL + 'motivos-de-reasignacion', authHeader)
      .then(res => {
        return res.body.data
      })
  },
  getVisitasObjetivosPorMes (context, mes, year) {
    const authHeader = {headers: auth.getAuthHeader()}
    const primeroDelMes = new Date(year || new Date().getFullYear(), mes, 1)
    const enUnMes = new Date(primeroDelMes)
    enUnMes.setDate(primeroDelMes.getDate() + 30)
    return context.$http.get(API_URL + 'recorrido-historico/' +
      '?fechaAsignacion[$gte]=' +
      primeroDelMes.toISOString() +
      '&fechaAsignacion[$lt]=' +
      enUnMes.toISOString(), authHeader)
      .then(recorridos => {
        const promesas = recorridos.body.data.map(recorrido => context.$http.get(API_URL + 'detalle-recorrido-historico' +
          '?idRecorridoHistorico=' + recorrido.idRecorridosHistoricos, authHeader)
          .then(res => res.body.data.map(objetivo => Object.assign({},
            {
              idRecorrido: recorrido.idRecorrido,
              fechaAsignacion: recorrido.fechaAsignacion,
              idTurno: recorrido.idTurno,
              idEmpleado: recorrido.idEmpleadoAsignado,
              idObjetivo: objetivo.idObjetivo,
              entregado: objetivo.entregado
            }
          ))))
        return Promise.all(promesas)
      })
      .then(detalles => {
        const flattedDetalles = flatten(detalles)
        return flattedDetalles
      })
      .then(detallesRaw => {
        const promesas = detallesRaw.map(d => context.$http.get(API_URL + 'objetivos-x-cliente/' +
          d.idObjetivo, authHeader)
          .then(res => Object.assign({}, d, {nombre: res.body.nombre})))
        return Promise.all(promesas)
      })
      .then(detallesConNombre => {
        const promesas = detallesConNombre.map(d => context.$http.get(API_URL + 'empleados/' +
          d.idEmpleado, authHeader)
          .then(res => Object.assign({}, d, {empleado: `${res.body.apellido}, ${res.body.nombre}`})))
        return Promise.all(promesas)
      })
      .then(detallesConEmpleado => {
        return detallesConEmpleado
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  }
}

const flatten = array => array.reduce((acc, val) => acc.concat(val), [])

// TODO: mejorar esto para que devuelva arreglos u otra key
const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
