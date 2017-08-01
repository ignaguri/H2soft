// Initializes the `Localidades` service on path `/localidades`
const createService = require('feathers-sequelize');
const createModel = require('../../models/localidades.model');
const hooks = require('./localidades.hooks');
const filters = require('./localidades.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'localidades',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/localidades', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('localidades');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
