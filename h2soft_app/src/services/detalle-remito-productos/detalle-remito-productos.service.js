// Initializes the `detalle-remito` service on path `/detalle-remito`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalle-remito-productos.model');
const hooks = require('./detalle-remito-productos.hooks');
const filters = require('./detalle-remito-productos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalle-remito-productos',
    id: 'idDetallesRemitoProductos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalle-remito-productos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalle-remito-productos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
