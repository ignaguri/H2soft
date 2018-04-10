const assert = require('assert');
const app = require('../../src/app');

describe('\'estados-dispenser\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados-dispenser');

    assert.ok(service, 'Registered the service');
  });
});
