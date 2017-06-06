'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};