const assert = require('assert');
const app = require('../../src/app');

describe('\'detalle-recorrido\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalle-recorrido');

    assert.ok(service, 'Registered the service');
  });
});
