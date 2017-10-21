// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true
    },
    password: {
      type: Sequelize.CHAR(255),
      allowNull: true
    },
    idRol: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      //agrego valor por default porque sino /autentication da error y no duvuelve el token
      default : 1,
      references: {
        model: 'roles',
        key: 'idRoles'
      }
    },
    idEmpleado: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'idEmpleados'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  users.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
