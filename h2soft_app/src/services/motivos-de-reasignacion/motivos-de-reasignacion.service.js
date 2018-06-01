// Initializes the `motivos-de-reasignacion` service on path `/motivos-de-reasignacion`
const createService = require('feathers-sequelize');
const createModel = require('../../models/motivos-de-reasignacion.model');
const hooks = require('./motivos-de-reasignacion.hooks');
const filters = require('./motivos-de-reasignacion.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'motivos-de-reasignacion',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/motivos-de-reasignacion', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('motivos-de-reasignacion');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
