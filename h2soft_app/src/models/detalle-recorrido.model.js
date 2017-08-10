// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detalleRecorrido = sequelizeClient.define('detalle-recorrido', {
    idDetalleRecorrido: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idRecorrido: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'recorridos',
        key: 'idRecorridos'
      }
    },
    idObjetivo: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'objetivos-x-cliente',
        key: 'idObjetivosXCliente'
      }
    },
    orden: {
      type: Sequelize.INTEGER(11),
      allowNull: true
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
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detalleRecorrido.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detalleRecorrido;
};
