const assert = require('assert');
const app = require('../../src/app');

describe('\'detalle-remito\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalle-remito');

    assert.ok(service, 'Registered the service');
  });
});
