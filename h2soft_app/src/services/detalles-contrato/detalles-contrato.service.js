// Initializes the `detallesContrato` service on path `/detalles-contrato`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalles-contrato.model');
const hooks = require('./detalles-contrato.hooks');
const filters = require('./detalles-contrato.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalles-contrato',
    id: 'idDetallesContrato',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalles-contrato', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalles-contrato');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
