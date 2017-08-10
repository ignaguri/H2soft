const assert = require('assert');
const app = require('../../src/app');

describe('\'detalleFactura\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalle-factura');

    assert.ok(service, 'Registered the service');
  });
});
