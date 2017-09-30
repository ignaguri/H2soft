// Initializes the `productos` service on path `/productos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/productos.model');
const hooks = require('./productos.hooks');
const filters = require('./productos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'productos',
    id: 'idProductos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/productos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('productos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
