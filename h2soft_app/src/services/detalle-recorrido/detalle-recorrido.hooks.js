const { authenticate } = require('feathers-authentication').hooks;
const ordenarObjetivos = require('../../hooks/ordenar-objetivos');
const verificarExistencia = require('../../hooks/verificarExistencia');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [verificarExistencia()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ordenarObjetivos()],
    update: [ordenarObjetivos()],
    patch: [ordenarObjetivos()],
    remove: [ordenarObjetivos()]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
