const cliente = require('./cliente/cliente.service.js');
const roles = require('./roles/roles.service.js');
const localidades = require('./localidades/localidades.service.js');
const provincias = require('./provincias/provincias.service.js');
const paises = require('./paises/paises.service.js');
const users = require('./users/users.service.js');
const empleados = require('./empleados/empleados.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(cliente);
  app.configure(roles);
  app.configure(localidades);
  app.configure(provincias);
  app.configure(paises);
  app.configure(users);
  app.configure(empleados);
};
