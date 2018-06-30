// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const objetivoCantidadProducto = sequelizeClient.define('objetivo-cantidad-producto', {
    idObjetivoCantidadProducto: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	idObjetivo: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'objetivos-x-cliente',
        key: 'idObjetivosXCliente'
      }
    },
	idProducto: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'productos',
        key: 'idProductos'
      }
    },
	cantidad: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  objetivoCantidadProducto.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return objetivoCantidadProducto;
};
