const assert = require('assert');
const app = require('../../src/app');

describe('\'contratos\' service', () => {
  it('registered the service', () => {
    const service = app.service('contratos');

    assert.ok(service, 'Registered the service');
  });
});
