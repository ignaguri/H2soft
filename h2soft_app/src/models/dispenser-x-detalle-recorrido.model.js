// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const dispenserXDetalleRecorrido = sequelizeClient.define('dispenser-x-detalle-recorrido', {
    idDispenserXDetalleRecorrido: {
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
    idDetalleRecorrido: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'detalle-recorrido',
        key: 'idDetalleRecorrido'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  dispenserXDetalleRecorrido.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return dispenserXDetalleRecorrido;
};
