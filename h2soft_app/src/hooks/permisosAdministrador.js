module.exports = function () {
  return function checkPermissionsAdministrador(hook) {
    console.log('payload', hook.params.payload);
    return hook.app.services['users'].get(hook.params.payload.usersId)
      .then(r => {
        console.log('REsultado: user' + hook.params.payload.usersId + ', rol: ' + r.idRol)
        if (r.idRol === 1) {
          return Promise.resolve(hook)
        } else {
          return Promise.reject(new Error('Not authorized'))
        }
      })
  };
};
