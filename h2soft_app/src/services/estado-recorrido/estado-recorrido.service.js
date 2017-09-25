// Initializes the `estado-recorrido` service on path `/estadorecorrido`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-recorrido.model');
const hooks = require('./estado-recorrido.hooks');
const filters = require('./estado-recorrido.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estado-recorrido',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estadorecorrido', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estadorecorrido');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
