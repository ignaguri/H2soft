module.exports = function () {
  return function checkPermissionsAdministrador(hook) {
    hook.app.services['users'].get(hook.params.payload.usersId)
      .then(r => {
        console.log('REsultado: user' + hook.params.payload.usersId + ', rol: ' + r.idRol)
        if (r.idRol === 1) {
          console.log('RESOLVEE ')
          return Promise.resolve(hook)
        } else {
          console.log('REJECTT ')
          return Promise.reject(hook)
        }
      })
  };
};
