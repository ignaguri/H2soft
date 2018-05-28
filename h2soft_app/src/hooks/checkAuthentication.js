module.exports = function () {
  var util = require('util')
  return function checkPermissions(hook) {
    let idRol = 0
    let usuario
       if (hook.params.payload.usersId == 2) {
         //console.log('prueba:' + util.inspect(hook.app.services))
         hook.app.services['users'].get(hook.params.payload.usersId)
           .then(r => {
             usuario: r.data
             console.log('r: ' + util.inspect(r.idRol))
             idRol = r.idRol
             console.log('rol: ' + idRol)
             if (idRol === 1) {
               console.log('idRol = 1');
             }
           })
         console.log('usuario =',usuario);
        // console.log('idRol =',idRol);

         console.log('request user id', hook.params.payload.usersId);
         return Promise.resolve(hook);
    } else {
         console.log('reject request, user id', hook.params.payload.usersId);
         return Promise.reject(hook);
       }
  };
};

