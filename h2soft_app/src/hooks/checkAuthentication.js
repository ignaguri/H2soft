module.exports = function () {
  return function checkPermissions(hook) {
       if (hook.params.payload.usersId == 2) {
         console.log('request user id', hook.params.payload.usersId);
         return Promise.resolve(hook);
    } else {
         console.log('2request user id', hook.params.payload.usersId);
         return Promise.reject(hook);
       }
  };
};
