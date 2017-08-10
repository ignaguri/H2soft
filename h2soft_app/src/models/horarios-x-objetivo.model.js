// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const horariosXObjetivo = sequelizeClient.define('horarios-x-objetivo', {
    idHorariosXObjetivo: {
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
    idDia: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'dias',
        key: 'idDias'
      }
    },
    horaDesde: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    horaHasta: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  horariosXObjetivo.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return horariosXObjetivo;
};
