const assert = require('assert');
const app = require('../../src/app');

describe('\'historial-x-dispenser\' service', () => {
  it('registered the service', () => {
    const service = app.service('historial-x-dispenser');

    assert.ok(service, 'Registered the service');
  });
});
