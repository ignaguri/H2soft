// Initializes the `DetalleRecorridoHistorico` service on path `/detalle-recorrido-historico`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalle-recorrido-historico.model');
const hooks = require('./detalle-recorrido-historico.hooks');
const filters = require('./detalle-recorrido-historico.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalle-recorrido-historico',
    id: 'idDetalleRecorridoHistorico',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalle-recorrido-historico', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalle-recorrido-historico');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
