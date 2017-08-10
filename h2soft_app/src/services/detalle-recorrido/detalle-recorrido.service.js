// Initializes the `detalle-recorrido` service on path `/detalle-recorrido`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalle-recorrido.model');
const hooks = require('./detalle-recorrido.hooks');
const filters = require('./detalle-recorrido.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalle-recorrido',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalle-recorrido', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalle-recorrido');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
