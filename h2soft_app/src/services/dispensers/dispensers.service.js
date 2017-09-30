// Initializes the `dispensers` service on path `/dispensers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/dispensers.model');
const hooks = require('./dispensers.hooks');
const filters = require('./dispensers.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'dispensers',
    id: 'idDispensers',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dispensers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('dispensers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
