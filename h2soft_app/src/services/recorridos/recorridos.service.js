// Initializes the `recorridos` service on path `/recorridos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/recorridos.model');
const hooks = require('./recorridos.hooks');
const filters = require('./recorridos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'recorridos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/recorridos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('recorridos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
