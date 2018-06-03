// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const historialXDispenser = sequelizeClient.define('historial_x_dispenser', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idDispenser: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
        model: 'dispensers',
        key: 'idDispensers'
      }
    },
       idEstadosDispenser: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
        model: 'estados-dispenser',
        key: 'idEstadosDispenser'
      }
    },
    idObjetivo: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
      	model: 'objetivos-x-cliente',
      	key: 'idObjetivosXCliente'
      }
    },

   fechaRegistro:{
   	type: Sequelize.DATE,
   	allowNull: false,
   }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  historialXDispenser.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return historialXDispenser;
};
