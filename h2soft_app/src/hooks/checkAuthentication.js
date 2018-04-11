module.exports = function () {
  return function (hook) {
    console.log('request user id', hook.params.payload.usersId);
    //console.log('passport', hook.app.settings.auth);
  };
};
