// Initializes the `frecuenciaRecorridos` service on path `/frecuencia-recorridos`
const createService = require('feathers-sequelize');
const createModel = require('../../models/frecuencias-recorrido.model');
const hooks = require('./frecuencia-recorridos.hooks');
const filters = require('./frecuencia-recorridos.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'frecuencia-recorridos',
    id: 'idFrecuenciasRecorrido',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/frecuencia-recorridos', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('frecuencia-recorridos');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
