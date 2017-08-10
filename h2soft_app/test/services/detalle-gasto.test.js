const assert = require('assert');
const app = require('../../src/app');

describe('\'detalle-gasto\' service', () => {
  it('registered the service', () => {
    const service = app.service('detalle-gasto');

    assert.ok(service, 'Registered the service');
  });
});
