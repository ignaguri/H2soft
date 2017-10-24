// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function ordenarObjetivos (hook) {
    let elRecorrido = hook.result.idRecorrido;
    hook.service.find({query: {idRecorrido: elRecorrido} })
      .then(r => {
        //console.log('Ordename esto, Nestor', r);
        ordenar(r.data, hook);
      })
    return Promise.resolve(hook);
  };
};

function ordenar(objetivos, hook) {
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
            orden: null
          });
        })
    );
  });
  Promise.all(promesas)
    .then(r => {
      console.log('ordenados', ordenados);
      const maps = require('@google/maps').createClient({
        key: 'AIzaSyCObbBpnMALUeTO-BFhVm5w64F7hm8g6e4',
        Promise: Promise
      });
      let visitar = ['optimize:true'];
      ordenados.forEach(o => {
        visitar.push(o.direccion + ', ' + o.localidad);
      })
      console.log('debo visitar', visitar);
      maps.directions({
        origin: ['Abreu de Albornoz 467, Córdoba'],
        waypoints: visitar,
        destination: ['Abreu de Albornoz 467, Córdoba']
      }).asPromise()
        .then((response) => {
          console.log('yay', response.status);
          console.log('el orden de los objetivos debe ser', response.json.routes[0].waypoint_order);
        })
        .catch((err) => {
          console.log('nooo', err);
        });
    });
}
