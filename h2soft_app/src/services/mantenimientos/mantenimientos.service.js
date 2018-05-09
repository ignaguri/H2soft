// Initializes the `Mantenimientos` service on path `/mantenimientos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/mantenimientos.model');
const hooks = require('./mantenimientos.hooks');
const filters = require('./mantenimientos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'mantenimientos',
	id: 'idMantenimientos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mantenimientos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mantenimientos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
