// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const recorridoHistorico = sequelizeClient.define('recorridos-historicos', {
    idRecorridosHistoricos: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idDia: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'dias',
        key: 'idDias'
      }
    },
    idFrecuencia: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'frecuencias-recorrido',
        key: 'idFrecuenciasRecorrido'
      }
    },
    idTurno: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'turnos',
        key: 'idTurnos'
      }
    },
    idTemporada: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'temporadas',
        key: 'idTemporadas'
      }
    },
    idEstado: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'estados-recorrido',
        key: 'idEstadosRecorrido'
      }
    },
    idEmpleadoAsignado: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'idEmpleados'
      }
    },
    idCamionAsignado: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'camiones',
        key: 'idCamiones'
      }
    },
    fechaInicio: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fechaFin: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  recorridoHistorico.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return recorridoHistorico;
};
