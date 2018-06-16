// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const objetivosXCliente = sequelizeClient.define('objetivos-x-cliente', {
    idObjetivosXCliente: {
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
    direccion: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    localidad: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    latitud: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    longitud: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    observaciones: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    activo: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
      default : true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  objetivosXCliente.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return objetivosXCliente;
};
