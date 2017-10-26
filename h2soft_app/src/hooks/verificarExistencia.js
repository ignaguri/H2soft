module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function check (hook) {
    let recorrido = hook.params.query.idRecorrido;
    return hook.service.find({query: {idRecorrido: recorrido}})
      .then(r => {
        if (r.data.length == 0) {
          console.log('Intentando borrar un recorrido sin detalleRecorrido\'s...puenteando el error...');
          hook.result = {data: 'None deleted'};
          return Promise.resolve(hook);
        }
        else {
          return Promise.resolve(hook);
        }
      });
  };
};
