// Initializes the `recorridoHistorico` service on path `/recorrido-historico`
const createService = require('feathers-sequelize');
const createModel = require('../../models/recorridos-historicos.model');
const hooks = require('./recorridos-historicos.hooks');
const filters = require('./recorridos-historicos.filters');
const logger = require('winston');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'recorrido-historico',
    id: 'idRecorridosHistoricos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/recorrido-historico', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('recorrido-historico');
  app.service('recorrido-historico/asignar', {
    create: function (data, params, callback){
      return replicarAsignacion(app, data);
    }
  });
  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

function replicarAsignacion(ap, data) {
  let recorrido = null;
  let detallesRecorrido = [];
  const today = new Date();
  today.setHours(0,0,0,0);
  return ap.services['recorridos'].get(data.recorrido)
    .then(r => {
      recorrido = {
        idDia: r.idDia,
        idFrecuencia: r.idFrecuencia,
        idTurno: r.idTurno,
        idTemporada: r.idTemporada,
        idEstado: 1,
        idEmpleadoAsignado: data.empleado,
        fechaAsignacion: today,
        idRecorrido: data.recorrido
      };
      return ap.services['detalle-recorrido'].find({query: {idRecorrido: data.recorrido}});
    })
    .then(d => {
      d.data.forEach(det => {
        const detalle = {
          idRecorridoHistorico: null,
          idObjetivo: det.idObjetivo,
          orden: det.orden,
          entregado: 0
        };
        detallesRecorrido.push(detalle);
      });
      let recorridos = [];
      const aux = getDiaAsignacion(recorrido.idDia);
      for(let i = 0; i < getFrecuencia(recorrido.idFrecuencia); i++){
        aux.setDate(aux.getDate() + (i * 7));
        let recorridoAux = Object.assign({},recorrido);
        recorridoAux.fechaAsignacion = aux.toISOString();
        recorridos.push(recorridoAux);
      }
      return recorridos;
    })
    .then(aInsertar => {
      return ap.services['recorrido-historico'].create(aInsertar);
    })
    .then(recs => {
      let detallesAInsertar = [];
      recs.forEach(r => {
        //let detallesAux = Array.from(detallesRecorrido);
        let detallesAux = detallesRecorrido.slice();
        detallesAux.forEach(d => {
          let aux = Object.assign({},d);
          aux.idRecorridoHistorico = r.idRecorridosHistoricos;
          detallesAInsertar.push(aux);
        });
      });
      return ap.services['detalle-recorrido-historico'].create(detallesAInsertar);
    })
    .then(solved => {
      logger.info('Se asignaron los recorridos');
      return true;
    })
    .catch(error => {
      logger.error(error);
    });

}

function getFrecuencia (id) {
  // retorna cuantas iteraciones han de hacerse según la frecuencia
  // por ej: id 1 = 1 vez por semana -> 4 iteraciones
  // el día inicial, la semana siguiente, la otra semana y la ultima semana de ese mes
  switch (id) {
  case 1:
    return 4;
  case 2:
    return 2;
  case 3:
    return 1;
  }
}

function getDiaAsignacion (dia) {
  // Sunday - Saturday : 0 - 6
  const today = new Date();
  today.setHours(0);
  if (today.getDay() < dia) {
    today.setDate(today.getDate() + (dia - today.getDay()))
    return today;
  } else {
    today.setDate(today.getDate() + ((dia + 7) - today.getDay()))
    return today;
  }
}
