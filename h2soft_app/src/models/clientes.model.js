// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const clientes = sequelizeClient.define('clientes', {
    idClientes: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    razonSocial: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true
    },
    direccion: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    CUIL: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true
    },
    idTipo: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tipos-cliente',
        key: 'idTiposCliente'
      }
    },
    activo: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
      default : 1
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  clientes.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return clientes;
};
