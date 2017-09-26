const assert = require('assert');
const app = require('../../src/app');

describe('\'estadosFactura\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados-factura');

    assert.ok(service, 'Registered the service');
  });
});
