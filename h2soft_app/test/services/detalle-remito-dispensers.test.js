const assert = require('assert');
const app = require('../../src/app');

describe('\'DetalleRemitoDispensers\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalle-remito-dispensers');

    assert.ok(service, 'Registered the service');
  });
});
