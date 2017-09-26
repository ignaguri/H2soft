// Initializes the `camiones` service on path `/camiones`
const createService = require('feathers-sequelize');
const createModel = require('../../models/camiones.model');
const hooks = require('./camiones.hooks');
const filters = require('./camiones.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'camiones',
    id: 'idCamiones',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/camiones', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('camiones');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
