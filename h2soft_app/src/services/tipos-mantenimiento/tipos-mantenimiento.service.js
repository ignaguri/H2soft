// Initializes the `tipos-mantenimiento` service on path `/tipos-mantenimiento`
const createService = require('feathers-sequelize');
const createModel = require('../../models/tipos-mantenimiento.model');
const hooks = require('./tipos-mantenimiento.hooks');
const filters = require('./tipos-mantenimiento.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tipos-mantenimiento',
    id: 'idTiposMantenimiento',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tipos-mantenimiento', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tipos-mantenimiento');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
