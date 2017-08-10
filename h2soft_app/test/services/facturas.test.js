const assert = require('assert');
const app = require('../../src/app');

describe('\'facturas\' service', () => {
  it('registered the service', () => {
    const service = app.service('facturas');

    assert.ok(service, 'Registered the service');
  });
});
