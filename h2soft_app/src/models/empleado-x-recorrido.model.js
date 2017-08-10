// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const empleadoXRecorrido = sequelizeClient.define('empleado-x-recorrido', {
    idEmpleadoXRecorrido: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idEmpleado: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'idEmpleados'
      }
    },
    idRecorrido: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'recorridos',
        key: 'idRecorridos'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  empleadoXRecorrido.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return empleadoXRecorrido;
};
