// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const remitosXFactura = sequelizeClient.define('remitos-x-factura', {
    idRemitosXFactura: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idFactura: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'facturas',
        key: 'idFacturas'
      }
    },
    idRemito: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'remitos',
        key: 'idRemito'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  remitosXFactura.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return remitosXFactura;
};
