const logger = require('winston');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function check (hook) {
    const recorrido = hook.params.query.idRecorrido;
    if (recorrido) {
      return hook.service.find({query: {idRecorrido: recorrido}})
        .then(r => {
          if (!r.data.length) {
            logger.info('Intentando borrar un recorrido sin detalleRecorrido\'s...puenteando el error...');
            hook.result = {data: 'None deleted'};
            return Promise.resolve(hook);
          }
          else {
            return Promise.resolve(hook);
          }
        });
    } else {
      return Promise.resolve(hook);
    }
  };
};
