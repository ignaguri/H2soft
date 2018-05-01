const { authenticate } = require('feathers-authentication').hooks;
const checkPermissions  = require('../../hooks/checkAuthentication');
//const  hooks  = require('feathers-authentication-hooks');


module.exports = {
  before: {
    all: [ authenticate('jwt'),checkPermissions()],
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
