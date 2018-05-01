// Initializes the `tipos-alerta` service on path `/tipos-alerta`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tipos-alerta.model');
const hooks = require('./tipos-alerta.hooks');
const filters = require('./tipos-alerta.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tipos-alerta',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tipos-alerta', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tipos-alerta');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
