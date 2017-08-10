// Initializes the `empleado-x-recorrido` service on path `/empleado-x-recorrido`
const createService = require('feathers-sequelize');
const createModel = require('../../models/empleado-x-recorrido.model');
const hooks = require('./empleado-x-recorrido.hooks');
const filters = require('./empleado-x-recorrido.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'empleado-x-recorrido',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/empleado-x-recorrido', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('empleado-x-recorrido');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
