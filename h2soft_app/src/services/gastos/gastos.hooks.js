const { authenticate } = require('feathers-authentication').hooks;
//const checkPermissions  = require('../../hooks/checkAuthentication');
const checkPermissionsRepartidor  = require('../../hooks/permisosRepartidor');
const checkPermissionsAdministrador  = require('../../hooks/permisosAdministrador');
const insertarIdEmpleado  = require('../../hooks/insertarIdEmpleado');
//const  hooks  = require('feathers-authentication-hooks');


module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [checkPermissionsRepartidor()],
    get: [checkPermissionsRepartidor()],
    create: [checkPermissionsRepartidor()],
    update: [checkPermissionsRepartidor()],
    patch: [checkPermissionsRepartidor()],
    remove: [checkPermissionsAdministrador()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
