// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const mantenimiento = sequelizeClient.define('mantenimientos', {
    idMantenimientos: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idDispenser: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'dispensers',
        key: 'idDispensers'
      }
    },
    idTipoMantenimiento: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tipos-mantenimiento',
        key: 'idTiposMantenimiento'
      }
    },
    fechaProgramado: {
      type: Sequelize.DATE,
      allowNull: true
    },
    fechaRealizado: {
      type: Sequelize.DATE,
      allowNull: true
    },
    idEmpleado: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'idEmpleados'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  mantenimiento.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return mantenimiento;
};
