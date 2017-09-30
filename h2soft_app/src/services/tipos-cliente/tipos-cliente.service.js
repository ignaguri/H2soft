// Initializes the `tiposCliente` service on path `/tipos-cliente`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tipos-cliente.model');
const hooks = require('./tipos-cliente.hooks');
const filters = require('./tipos-cliente.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tipos-cliente',
    id: 'idTiposCliente',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tipos-cliente', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tipos-cliente');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
