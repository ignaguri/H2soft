// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const dispensers = sequelizeClient.define('dispensers', {
    idDispensers: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    descripcion: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    idObjetivo: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'objetivos-x-cliente',
        key: 'idObjetivosXCliente'
      }
    },
	idEstadoDispenser: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'estados-dispenser',
        key: 'idEstadosDispenser'
      }
    },
	fechaProxMantenimiento: {
      type: Sequelize.DATE,
      allowNull: true
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  dispensers.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return dispensers;
};
