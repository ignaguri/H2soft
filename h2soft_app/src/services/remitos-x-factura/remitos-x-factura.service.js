// Initializes the `remitos-x-factura` service on path `/remitos-x-factura`
const createService = require('feathers-sequelize');
const createModel = require('../../models/remitos-x-factura.model');
const hooks = require('./remitos-x-factura.hooks');
const filters = require('./remitos-x-factura.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'remitos-x-factura',
    id: 'idRemitosXFactura',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/remitos-x-factura', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('remitos-x-factura');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
