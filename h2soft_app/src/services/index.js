const roles = require('./roles/roles.service.js');
const localidades = require('./localidades/localidades.service.js');
const provincias = require('./provincias/provincias.service.js');
const paises = require('./paises/paises.service.js');
const users = require('./users/users.service.js');
const empleados = require('./empleados/empleados.service.js');
const dias = require('./dias/dias.service.js');
const dispensers = require('./dispensers/dispensers.service.js');
const facturas = require('./facturas/facturas.service.js');
const gastos = require('./gastos/gastos.service.js');
const productos = require('./productos/productos.service.js');
const recorridos = require('./recorridos/recorridos.service.js');
const remitos = require('./remitos/remitos.service.js');
const contratos = require('./contratos/contratos.service.js');
const detalleFactura = require('./detalle-factura/detalle-factura.service.js');
const detalleGasto = require('./detalle-gasto/detalle-gasto.service.js');
const detalleRecorrido = require('./detalle-recorrido/detalle-recorrido.service.js');
const detalleRemito = require('./detalle-remito-productos/detalle-remito-productos.service.js');
const dispenserXDetalleRecorrido = require('./dispenser-x-detalle-recorrido/dispenser-x-detalle-recorrido.service.js');
const horariosXObjetivo = require('./horarios-x-objetivo/horarios-x-objetivo.service.js');
const mantenimiento = require('./mantenimiento/mantenimientos.service.js');
const objetivosXCliente = require('./objetivos-x-cliente/objetivos-x-cliente.service.js');
const remitosXFactura = require('./remitos-x-factura/remitos-x-factura.service.js');
const tiposMantenimiento = require('./tipos-mantenimiento/tipos-mantenimiento.service.js');
const contactosXCliente = require('./contactos-x-cliente/contactos-x-cliente.service.js');
const clientes = require('./clientes/clientes.service.js');

const tiposCliente = require('./tipos-cliente/tipos-cliente.service.js');

const frecuenciaRecorridos = require('./frecuencia-recorridos/frecuencia-recorridos.service.js');

const turnos = require('./turnos/turnos.service.js');

const estadosRecorrido = require('./estados-recorrido/estados-recorrido.service.js');

const estadosRemito = require('./estados-remito/estados-remito.service.js');

const estadosFactura = require('./estados-factura/estados-factura.service.js');

const temporada = require('./temporada/temporada.service.js');

const recorridoHistorico = require('./recorrido-historico/recorridos-historicos.service.js');

const detalleRecorridoHistorico = require('./detalle-recorrido-historico/detalle-recorrido-historico.service.js');

const detallesContrato = require('./detalles-contrato/detalles-contrato.service.js');

const camiones = require('./camiones/camiones.service.js');

const detalleRemitoDispensers = require('./detalle-remito-dispensers/detalle-remito-dispensers.service.js');

const mediosDePagoCobro = require('./medios-de-pago-cobro/medios-de-pago-cobro.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(roles);
  app.configure(localidades);
  app.configure(provincias);
  app.configure(paises);
  app.configure(users);
  app.configure(empleados);
  app.configure(dias);
  app.configure(dispensers);
  app.configure(facturas);
  app.configure(gastos);
  app.configure(productos);
  app.configure(recorridos);
  app.configure(remitos);
  app.configure(contratos);
  app.configure(detalleFactura);
  app.configure(detalleGasto);
  app.configure(detalleRecorrido);
  app.configure(detalleRemito);
  app.configure(dispenserXDetalleRecorrido);
  app.configure(horariosXObjetivo);
  app.configure(mantenimiento);
  app.configure(objetivosXCliente);
  app.configure(remitosXFactura);
  app.configure(tiposMantenimiento);
  app.configure(contactosXCliente);
  app.configure(clientes);
  app.configure(tiposCliente);
  app.configure(frecuenciaRecorridos);
  app.configure(turnos);
  app.configure(estadosRecorrido);
  app.configure(estadosRemito);
  app.configure(estadosFactura);
  app.configure(temporada);
  app.configure(recorridoHistorico);
  app.configure(detalleRecorridoHistorico);
  app.configure(detallesContrato);
  app.configure(camiones);
  app.configure(detalleRemitoDispensers);
  app.configure(mediosDePagoCobro);
};
