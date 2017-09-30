// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detallesContrato = sequelizeClient.define('detalles-contrato', {
    idDetallesContrato: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idContrato: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'contratos',
        key: 'idContratos'
      }
    },
    cantidadMaxima: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    precioPorUnidad: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    idProducto: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'productos',
        key: 'idProductos'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detallesContrato.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detallesContrato;
};
