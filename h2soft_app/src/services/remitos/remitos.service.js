// Initializes the `remitos` service on path `/remitos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/remitos.model');
const hooks = require('./remitos.hooks');
const filters = require('./remitos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'remitos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/remitos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('remitos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
