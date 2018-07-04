// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');


module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const alertas = sequelizeClient.define('alertas', {
    idAlertas: {
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
    idTipo: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
      	model: 'tipos-alerta',
      	key: 'idTipoAlerta'
      }	
    },
    idEstado: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
      	model: 'estados-alerta',
      	key: 'idEstadoAlerta'
      }
    },
    notificacion: {
 	  type: Sequelize.STRING(250),
 	  allowNull: false
    },
     idDispenser: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
        model: 'dispensers',
        key: 'idDispensers'
      }
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  alertas.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return alertas;
};
