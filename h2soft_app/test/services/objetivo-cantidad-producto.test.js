const assert = require('assert');
const app = require('../../src/app');

describe('\'ObjetivoCantidadProducto\' service', () => {
  it('registered the service', () => {
    const service = app.service('objetivo-cantidad-producto');

    assert.ok(service, 'Registered the service');
  });
});
