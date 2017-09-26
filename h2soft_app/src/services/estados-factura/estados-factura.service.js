// Initializes the `estadosFactura` service on path `/estados-factura`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-factura.model');
const hooks = require('./estados-factura.hooks');
const filters = require('./estados-factura.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estados-factura',
    id: 'idEstadosFactura',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estados-factura', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estados-factura');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
