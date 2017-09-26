// Initializes the `turnos` service on path `/turnos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/turnos.model');
const hooks = require('./turnos.hooks');
const filters = require('./turnos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'turnos',
    Model,
    id: 'idTurnos',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/turnos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('turnos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
