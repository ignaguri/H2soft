// Initializes the `objetivos-x-cliente` service on path `/objetivos-x-cliente`
const createService = require('feathers-sequelize');
const createModel = require('../../models/objetivos-x-cliente.model');
const hooks = require('./objetivos-x-cliente.hooks');
const filters = require('./objetivos-x-cliente.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'objetivos-x-cliente',
	id: 'idObjetivosXCliente',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/objetivos-x-cliente', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('objetivos-x-cliente');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
