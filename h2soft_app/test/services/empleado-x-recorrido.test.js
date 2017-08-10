const assert = require('assert');
const app = require('../../src/app');

describe('\'empleado-x-recorrido\' service', () => {
  it('registered the service', () => {
    const service = app.service('empleado-x-recorrido');

    assert.ok(service, 'Registered the service');
  });
});
