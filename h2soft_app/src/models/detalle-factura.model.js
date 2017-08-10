// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detalleFactura = sequelizeClient.define('detalle-factura', {
    idDetalleFactura: {
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
    idDetalleRemito: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'detalle-remito',
        key: 'idDetalleRemito'
      }
    },
    precio: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    subtotal: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detalleFactura.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detalleFactura;
};
