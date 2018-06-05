// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detalleRemitoDispensers = sequelizeClient.define('detalle-remito-dispensers', {
    idDetalleRemitoDispensers: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idRemito: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'remitos',
        key: 'idRemito'
      }
    },
    idDispenser: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'dispensers',
        key: 'idDispensers'
      }
    },
    dejadoEnCliente: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    requiereMantenimiento: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detalleRemitoDispensers.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detalleRemitoDispensers;
};
