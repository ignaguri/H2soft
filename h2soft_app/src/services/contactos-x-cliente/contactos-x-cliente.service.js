// Initializes the `contactos-x-cliente` service on path `/contactos-x-cliente`
const createService = require('feathers-sequelize');
const createModel = require('../../models/contactos-x-cliente.model');
const hooks = require('./contactos-x-cliente.hooks');
const filters = require('./contactos-x-cliente.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'contactos-x-cliente',
	id: 'idContactosXCliente',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contactos-x-cliente', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('contactos-x-cliente');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
