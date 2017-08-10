// Initializes the `dias` service on path `/dias`
const createService = require('feathers-sequelize');
const createModel = require('../../models/dias.model');
const hooks = require('./dias.hooks');
const filters = require('./dias.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'dias',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dias', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('dias');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
