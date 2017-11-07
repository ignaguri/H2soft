// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const detalleRecorridoHistorico = sequelizeClient.define('detalle-recorrido-historico', {
    idDetalleRecorridoHistorico: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idRecorridoHistorico: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'recorridos-historicos',
        key: 'idRecorridosHistoricos'
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
    idRemito: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'remitos',
        key: 'idRemito'
      }
    },
    entregado: {
      type: Sequelize.BOOLEAN(),
      allowNull: true
    },
    idProducto: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'productos',
        key: 'idProductos'
      }
    },
    cantidadSugerida: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    observaciones: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  detalleRecorridoHistorico.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return detalleRecorridoHistorico;
};
