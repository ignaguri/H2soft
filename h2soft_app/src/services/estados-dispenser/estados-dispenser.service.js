// Initializes the `estados-dispenser` service on path `/estados-dispenser`
const createService = require('feathers-sequelize');
const createModel = require('../../models/estados-dispenser.model');
const hooks = require('./estados-dispenser.hooks');
const filters = require('./estados-dispenser.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'estados-dispenser',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/estados-dispenser', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('estados-dispenser');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
