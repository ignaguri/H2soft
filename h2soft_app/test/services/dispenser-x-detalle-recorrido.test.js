const assert = require('assert');
const app = require('../../src/app');

describe('\'dispenser-x-detalle-recorrido\' service', () => {
  it('registered the service', () => {
    const service = app.service('dispenser-x-detalle-recorrido');

    assert.ok(service, 'Registered the service');
  });
});
