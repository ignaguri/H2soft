// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');


module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const estadosAlerta = sequelizeClient.define('estados-alerta', {
    idEstadoAlerta: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  estadosAlerta.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return estadosAlerta;
};
