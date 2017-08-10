// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const facturas = sequelizeClient.define('facturas', {
    idFacturas: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false
    },
    idCliente: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'idClientes'
      }
    },
    total: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    modoDePago: {
      type: Sequelize.STRING(45),
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  facturas.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return facturas;
};
