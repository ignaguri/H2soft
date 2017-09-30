// Initializes the `Roles` service on path `/roles`
const createService = require('feathers-sequelize');
const createModel = require('../../models/roles.model');
const hooks = require('./roles.hooks');
const filters = require('./roles.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'roles',
    id: 'idRoles',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/roles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('roles');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
