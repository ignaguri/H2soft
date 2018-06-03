// Initializes the `estados-mantenimiento` service on path `/estados-mantenimiento`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-mantenimiento.model');
const hooks = require('./estados-mantenimiento.hooks');
const filters = require('./estados-mantenimiento.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estados-mantenimiento',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estados-mantenimiento', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estados-mantenimiento');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
