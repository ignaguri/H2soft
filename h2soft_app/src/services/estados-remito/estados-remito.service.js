// Initializes the `estadosRemito` service on path `/estados-remito`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-remito.model');
const hooks = require('./estados-remito.hooks');
const filters = require('./estados-remito.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estados-remito',
    id: 'idEstadosRemito',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estados-remito', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estados-remito');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
