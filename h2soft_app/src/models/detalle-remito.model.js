// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detalleRemito = sequelizeClient.define('detalle-remito', {
    idDetalleRemito: {
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
    producto: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'productos',
        key: 'idProductos'
      }
    },
    cantidad: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    dispenser: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'dispensers',
        key: 'idDispensers'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detalleRemito.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detalleRemito;
};
