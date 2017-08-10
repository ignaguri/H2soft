// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detalleGasto = sequelizeClient.define('detalle-gasto', {
    idDetalleGasto: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idGasto: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'gastos',
        key: 'idGastos'
      }
    },
    descripcion: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    precio: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detalleGasto.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detalleGasto;
};
