// Initializes the `detalleFactura` service on path `/detalle-factura`
const createService = require('feathers-sequelize');
const createModel = require('../../models/detalle-factura.model');
const hooks = require('./detalle-factura.hooks');
const filters = require('./detalle-factura.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'detalle-factura',
    id: 'idDetalleFactura',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/detalle-factura', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('detalle-factura');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
