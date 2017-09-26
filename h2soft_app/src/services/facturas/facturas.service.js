// Initializes the `facturas` service on path `/facturas`
const createService = require('feathers-sequelize');
const createModel = require('../../models/facturas.model');
const hooks = require('./facturas.hooks');
const filters = require('./facturas.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'facturas',
    id: 'idFacturas',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/facturas', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('facturas');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
