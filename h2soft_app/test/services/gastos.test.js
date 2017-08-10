const assert = require('assert');
const app = require('../../src/app');

describe('\'gastos\' service', () => {
  it('registered the service', () => {
    const service = app.service('gastos');

    assert.ok(service, 'Registered the service');
  });
});
