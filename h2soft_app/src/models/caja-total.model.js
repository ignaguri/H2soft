// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const cajaTotal = sequelizeClient.define('caja-total', {
    idCajaTotal: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, idMedioDePago: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'medios-de-pago-cobro',
        key: 'idMediosDePagoCobro'
      }
    },monto: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },fecha: {
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

  cajaTotal.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return cajaTotal;
};
