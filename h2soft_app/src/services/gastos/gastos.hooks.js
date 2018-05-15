const { authenticate } = require('feathers-authentication').hooks;
//const checkPermissions  = require('../../hooks/checkAuthentication');
//const checkPermissionsRepartidor  = require('../../hooks/permisosRepartidor');
const checkPermissionsAdministrador  = require('../../hooks/permisosAdministrador');
//const  hooks  = require('feathers-authentication-hooks');


module.exports = {
  before: {
    all: [ authenticate('jwt'),checkPermissionsAdministrador()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
