// Initializes the `recorridoHistorico` service on path `/recorrido-historico`
const createService = require('feathers-sequelize');
const createModel = require('../../models/recorridos-historicos.model');
const hooks = require('./recorridos-historicos.hooks');
const filters = require('./recorridos-historicos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'recorrido-historico',
    id: 'idRecorridosHistoricos',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/recorrido-historico', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('recorrido-historico');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
