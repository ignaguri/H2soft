// Initializes the `Caja_Total` service on path `/caja-total`
const createService = require('feathers-sequelize');
const createModel = require('../../models/caja-total.model');
const hooks = require('./caja-total.hooks');
const filters = require('./caja-total.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'caja-total',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/caja-total', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('caja-total');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
