// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const contactosXCliente = sequelizeClient.define('contactos-x-cliente', {
    idContactosXCliente: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idCliente: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'idClientes'
      }
    },
    nombre: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    telefono: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    celular: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    mail: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    observaciones: {
      type: Sequelize.STRING(500),
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  contactosXCliente.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return contactosXCliente;
};
