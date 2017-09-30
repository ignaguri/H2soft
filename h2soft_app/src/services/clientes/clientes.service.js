// Initializes the `clientes` service on path `/clientes`
const createService = require('feathers-sequelize');
const createModel = require('../../models/clientes.model');
const hooks = require('./clientes.hooks');
const filters = require('./clientes.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'clientes',
	  id: 'idClientes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/clientes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('clientes');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
