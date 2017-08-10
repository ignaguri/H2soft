// Initializes the `dispenser-x-detalle-recorrido` service on path `/dispenser-x-detalle-recorrido`
const createService = require('feathers-sequelize');
const createModel = require('../../models/dispenser-x-detalle-recorrido.model');
const hooks = require('./dispenser-x-detalle-recorrido.hooks');
const filters = require('./dispenser-x-detalle-recorrido.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'dispenser-x-detalle-recorrido',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dispenser-x-detalle-recorrido', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('dispenser-x-detalle-recorrido');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
