// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const empleados = sequelizeClient.define('empleados', {
    idEmpleados: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    apellido: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    dni: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    fechaNacimiento: {
      type: Sequelize.DATE,
      allowNull: false
    },
    direccion: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    localidad: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    telefono: {
      type: Sequelize.INTEGER(30),
      allowNull: true,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  empleados.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return empleados;
};
