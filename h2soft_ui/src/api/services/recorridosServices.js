import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA RECORRIDOS
export default {
  getRecorridosAsignados (context) {
    return context.$http.get(API_URL + 'empleado-x-recorrido', authHeader)
  },
  getRecorridoAsignadoXId (context, idRecorridoAsignado) {
    return context.$http.get(API_URL + 'empleado-x-recorrido/?idEmpleadoXRecorrido=' + idRecorridoAsignado, authHeader)
  },
  getRecorridosAsignadosXEmpleado (context, idEmpleado) {
    return context.$http.get(API_URL + 'empleado-x-recorrido/?idEmpleado=' + idEmpleado, authHeader)
  },
  getRecorrido (context, idRecorrido) {
    return context.$http.get(API_URL + 'recorridos/?idRecorridos=' + idRecorrido, authHeader)
  },
  getDetalleRecorrido (context, idRecorrido) {
    return context.$http.get(API_URL + 'detalle-recorrido/?idRecorrido=' + idRecorrido, authHeader)
  },
  getObjetivoXId (context, idObjetivo) {
    return context.$http.get(API_URL + 'objetivos-x-cliente/?idObjetivosXCliente=' + idObjetivo, authHeader)
  }
}
