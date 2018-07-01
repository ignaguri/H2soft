// Initializes the `ObjetivoCantidadProducto` service on path `/objetivo-cantidad-producto`
const createService = require('feathers-sequelize');
const createModel = require('../../models/objetivo-cantidad-producto.model');
const hooks = require('./objetivo-cantidad-producto.hooks');
const filters = require('./objetivo-cantidad-producto.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'objetivo-cantidad-producto',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/objetivo-cantidad-producto', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('objetivo-cantidad-producto');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
