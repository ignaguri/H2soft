// Initializes the `historial-x-dispenser` service on path `/historial-x-dispenser`
const createService = require('feathers-sequelize');
const createModel = require('../../models/historial-x-dispenser.model');
const hooks = require('./historial-x-dispenser.hooks');
const filters = require('./historial-x-dispenser.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'historial-x-dispenser',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/historial-x-dispenser', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('historial-x-dispenser');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
