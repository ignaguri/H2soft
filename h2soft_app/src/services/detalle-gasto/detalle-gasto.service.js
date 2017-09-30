// Initializes the `detalle-gasto` service on path `/detalle-gasto`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalle-gasto.model');
const hooks = require('./detalle-gasto.hooks');
const filters = require('./detalle-gasto.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalle-gasto',
    id: 'idDetalleGasto',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalle-gasto', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalle-gasto');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
