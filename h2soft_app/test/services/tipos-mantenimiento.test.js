const assert = require('assert');
const app = require('../../src/app');

describe('\'tipos-mantenimiento\' service', () => {
  it('registered the service', () => {
    const service = app.service('tipos-mantenimiento');

    assert.ok(service, 'Registered the service');
  });
});
