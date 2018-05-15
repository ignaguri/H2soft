module.exports = function () {
  return function checkPermissionsEncargadoReparto(hook) {
    hook.app.services['users'].get(hook.params.payload.usersId)
      .then(r => {
        console.log('user' + hook.params.payload.usersId + ', rol: ' + r.idRol)
        if (r.idRol <= 2) {
          return Promise.resolve(hook);
        } else {
          return Promise.reject(hook);
        }
      })
  };
};
