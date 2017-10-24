// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function ordenarObjetivos (hook) {
    if (!hook.params.ordenamiento){
      let elRecorrido = hook.result.length === undefined? hook.result.idRecorrido : hook.result[0].idRecorrido;
      hook.service.find({query: {idRecorrido: elRecorrido} })
        .then(r => {
          //console.log('Ordename esto, Nestor', r);
          ordenar(r.data, elRecorrido, hook);
        })
    }
    return Promise.resolve(hook);
  };
};

function ordenar(objetivos, recorrido, hook) {
  if (objetivos.length <= 1){
    // ponerle el orden 1 a ese objetivo
    return;
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
      })
      maps.directions({
        origin: ['Abreu de Albornoz 467, Córdoba'],
        waypoints: visitar,
        destination: ['Abreu de Albornoz 467, Córdoba']
      }).asPromise()
        .then((response) => {
          console.log('status OK:', response.status);
          let orden = response.json.routes[0].waypoint_order;
          actualizarOrden(ordenados, orden, hook);
        })
        .catch((err) => {
          console.log('ERROR', err);
        });
    });
}

function actualizarOrden(objetivos, orden, hook) {
  if (objetivos.length == orden.length) {
    for (var i = 0; i < orden.length; i++){
      hook.app.services['detalle-recorrido'].patch(null, {orden: orden[i]+1},
        {query: {idObjetivo: objetivos[i].idObjetivo, idRecorrido: objetivos[i].idRecorrido}, ordenamiento: true })
        .then(r => {
          console.log('Orden updated');
        })
        .catch(error => {
          console.log('error updating orden', error);
        });
    }
  }
}
