const assert = require('assert');
const app = require('../../src/app');

describe('\'DetalleRecorridoHistorico\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalle-recorrido-historico');

    assert.ok(service, 'Registered the service');
  });
});
