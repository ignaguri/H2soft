// Initializes the `Provincias` service on path `/provincias`
const createService = require('feathers-sequelize');
const createModel = require('../../models/provincias.model');
const hooks = require('./provincias.hooks');
const filters = require('./provincias.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'provincias',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/provincias', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('provincias');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
