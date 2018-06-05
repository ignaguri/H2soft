// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const remitos = sequelizeClient.define('remitos', {
    idRemito: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idObjetivo: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'objetivos-x-cliente',
        key: 'idObjetivosXCliente'
      }
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: true
    },
    idEmpleado: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'idEmpleados'
      }
    },
	idEstadoRemito: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'estados-remito',
        key: 'idEstadosRemito'
      }
    },
    firmaConforme: {
      type: Sequelize.INTEGER(1),
      allowNull: true
    },
    firma: {
      type: Sequelize.TEXT('medium'),
	  // type: Sequelize.STRING(30700),
	  allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  remitos.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return remitos;
};
