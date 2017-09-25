// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const recorridos = sequelizeClient.define('recorridos', {
    idRecorridos: {
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
    turno: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false
    },
    isTemplate: {
      type: Sequelize.INTEGER(1),
      allowNull: false
    }
    // idEstado: {
    //   type: Sequelize.INTEGER(11),
    //   allowNull: false,
    //   references: {
    //     model: 'estados-recorrido',
    //     key: 'idEstados'
    //   }
    // }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  recorridos.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return recorridos;
};
