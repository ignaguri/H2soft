// Initializes the `Paises` service on path `/paises`
const createService = require('feathers-sequelize');
const createModel = require('../../models/paises.model');
const hooks = require('./paises.hooks');
const filters = require('./paises.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'paises',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/paises', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('paises');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
