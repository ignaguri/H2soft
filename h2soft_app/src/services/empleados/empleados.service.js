// Initializes the `empleados` service on path `/empleados`
const createService = require('feathers-sequelize');
const createModel = require('../../models/empleados.model');
const hooks = require('./empleados.hooks');
const filters = require('./empleados.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'empleados',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/empleados', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('empleados');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
