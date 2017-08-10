const assert = require('assert');
const app = require('../../src/app');

describe('\'mantenimiento\' service', () => {
  it('registered the service', () => {
    const service = app.service('mantenimiento');

    assert.ok(service, 'Registered the service');
  });
});
