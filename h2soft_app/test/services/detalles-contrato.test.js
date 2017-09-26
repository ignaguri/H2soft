const assert = require('assert');
const app = require('../../src/app');

describe('\'detallesContrato\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalles-contrato');

    assert.ok(service, 'Registered the service');
  });
});
