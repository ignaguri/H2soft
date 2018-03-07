// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const gastos = sequelizeClient.define('gastos', {
    idGastos: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false
    },
    idEmpleado: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'idEmpleados'
      }
    },
    descripcion: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    monto: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    idMedioDePagoCobro: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'medios-de-pago-cobro',
        key: 'idMediosDePagoCobro'
      }
    }
  },
    {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  gastos.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return gastos;
};
