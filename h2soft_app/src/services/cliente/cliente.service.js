// Initializes the `cliente` service on path `/cliente`
const createService = require('feathers-sequelize');
const createModel = require('../../models/cliente.model');
const hooks = require('./cliente.hooks');
const filters = require('./cliente.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'cliente',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cliente', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cliente');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
