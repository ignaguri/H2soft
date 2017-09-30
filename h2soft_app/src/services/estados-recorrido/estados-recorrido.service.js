// Initializes the `estadosRecorrido` service on path `/estados-recorrido`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-recorrido.model');
const hooks = require('./estados-recorrido.hooks');
const filters = require('./estados-recorrido.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estados-recorrido',
    id: 'idEstadosRecorrido',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estados-recorrido', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estados-recorrido');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
