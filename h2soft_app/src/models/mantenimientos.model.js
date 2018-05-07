// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const mantenimientos = sequelizeClient.define('mantenimientos', {
    idMantenimientos: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	idObjetivo: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'objetivos-x-cliente',
        key: 'idObjetivosXCliente'
      }
    },
	idDispenser: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'dispensers',
        key: 'idDispensers'
      }
    },
	idEstadoMantenimiento: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'estados-mantenimiento',
        key: 'idEstadosMantenimiento'
      }
    },
	idTipoMantenimiento: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tipos-mantenimiento',
        key: 'idTiposMantenimiento'
      }
    },
	fechaRealizado: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  mantenimientos.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return mantenimientos;
};
