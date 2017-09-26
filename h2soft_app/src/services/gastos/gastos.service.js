// Initializes the `gastos` service on path `/gastos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/gastos.model');
const hooks = require('./gastos.hooks');
const filters = require('./gastos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'gastos',
    id: 'idGastos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/gastos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('gastos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
