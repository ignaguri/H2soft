const assert = require('assert');
const app = require('../../src/app');

describe('\'estados-mantenimiento\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados-mantenimiento');

    assert.ok(service, 'Registered the service');
  });
});
