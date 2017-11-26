// Initializes the `DetalleRemitoDispensers` service on path `/detalle-remito-dispensers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalle-remito-dispensers.model');
const hooks = require('./detalle-remito-dispensers.hooks');
const filters = require('./detalle-remito-dispensers.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalle-remito-dispensers',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalle-remito-dispensers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalle-remito-dispensers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
