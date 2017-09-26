// Initializes the `temporada` service on path `/temporada`
const createService = require('feathers-sequelize');
const createModel = require('../../models/temporadas.model');
const hooks = require('./temporada.hooks');
const filters = require('./temporada.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'temporada',
    id: 'idTemporada',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/temporada', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('temporada');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
