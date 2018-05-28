// Initializes the `mediosDePagoCobro` service on path `/medios-de-pago-cobro`
const createService = require('feathers-sequelize');
const createModel = require('../../models/medios-de-pago-cobro.model');
const hooks = require('./medios-de-pago-cobro.hooks');
const filters = require('./medios-de-pago-cobro.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'medios-de-pago-cobro',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/medios-de-pago-cobro', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('medios-de-pago-cobro');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
