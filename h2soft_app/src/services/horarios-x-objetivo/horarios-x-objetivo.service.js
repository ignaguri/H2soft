// Initializes the `horarios-x-objetivo` service on path `/horarios-x-objetivo`
const createService = require('feathers-sequelize');
const createModel = require('../../models/horarios-x-objetivo.model');
const hooks = require('./horarios-x-objetivo.hooks');
const filters = require('./horarios-x-objetivo.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'horarios-x-objetivo',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/horarios-x-objetivo', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('horarios-x-objetivo');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
