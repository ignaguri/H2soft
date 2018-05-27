// Initializes the `estados-alerta` service on path `/estados-alerta`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-alerta.model');
const hooks = require('./estados-alerta.hooks');
const filters = require('./estados-alerta.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estados-alerta',
	id: 'idEstadoAlerta',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estados-alerta', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estados-alerta');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
