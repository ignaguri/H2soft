const logger = require('winston');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function ordenarObjetivos (hook) {
    if (!hook.params.ordenamiento){
      let elRecorrido = hook.result.length === undefined? hook.result.idRecorrido : hook.result[0].idRecorrido;
      hook.service.find({query: {idRecorrido: elRecorrido} })
        .then(r => {
          //console.log('Ordename esto, Nestor', r);
          ordenar(r.data, elRecorrido, hook);
        });
    }
    return Promise.resolve(hook);
  };
};

function ordenar(objetivos, recorrido, hook) {
  if (objetivos.length <= 1){
    logger.info('Sólo queda un objetivo en el recorrido. Asignando orden 1...');
    return hook.app.services['detalle-recorrido'].patch(null, {orden: 1},
      {query: {idObjetivo: objetivos[0].idObjetivo, idRecorrido: recorrido}, ordenamiento: true })
      .then(r => {
        logger.info('Orden updated', r);
      })
      .catch(error => {
        logger.error('error updating orden', error);
      });
  }
  let ordenados = [];
  let promesas = [];

  objetivos.forEach(o => {
    promesas.push(
      hook.app.services['objetivos-x-cliente'].get(o.idObjetivo)
        .then(r => {
          ordenados.push({
            idObjetivo: r.idObjetivosXCliente,
            direccion: r.direccion,
            localidad: r.localidad,
            orden: null,
            idRecorrido: recorrido
          });
        })
    );
  });
  Promise.all(promesas)
    .then(r => {
      const maps = require('@google/maps').createClient({
        key: 'AIzaSyCObbBpnMALUeTO-BFhVm5w64F7hm8g6e4',
        Promise: Promise
      });
      let visitar = ['optimize:true'];
      ordenados.forEach(o => {
        visitar.push(o.direccion + ', ' + o.localidad);
      });
      logger.info('objetivos a visitar', visitar);
      maps.directions({
        origin: ['Abreu de Albornoz 467, Córdoba'],
        waypoints: visitar,
        destination: ['Abreu de Albornoz 467, Córdoba']
      }).asPromise()
        .then((response) => {
          logger.info('gmaps - status OK:', response.status);
          logger.info('gmaps - response:', JSON.stringify(response.json));
          let orden = ordenados.map(o => -1);
          if (response.json.routes.length) orden = response.json.routes[0].waypoint_order;
          actualizarOrden(ordenados, orden, hook);
        })
        .catch((err) => {
          logger.error('ERROR al solicitar direcciones a gmaps', err);
        });
    });
}

function actualizarOrden(objetivos, orden, hook) {
  if (objetivos.length === orden.length) {
    for (let i = 0; i < orden.length; i++){
      hook.app.services['detalle-recorrido'].patch(null, {orden: orden[i]+1},
        {query: {idObjetivo: objetivos[i].idObjetivo, idRecorrido: objetivos[i].idRecorrido}, ordenamiento: true })
        .then(r => {
          logger.info('Orden updated', r);
        })
        .catch(error => {
          logger.error('error updating orden', error);
        });
    }
  }
}
