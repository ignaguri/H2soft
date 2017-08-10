// Initializes the `mantenimiento` service on path `/mantenimiento`
const createService = require('feathers-sequelize');
const createModel = require('../../models/mantenimiento.model');
const hooks = require('./mantenimiento.hooks');
const filters = require('./mantenimiento.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'mantenimiento',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mantenimiento', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mantenimiento');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
