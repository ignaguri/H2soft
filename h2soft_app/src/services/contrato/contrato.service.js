// Initializes the `contrato` service on path `/contrato`
const createService = require('feathers-sequelize');
const createModel = require('../../models/contrato.model');
const hooks = require('./contrato.hooks');
const filters = require('./contrato.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'contrato',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contrato', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('contrato');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
