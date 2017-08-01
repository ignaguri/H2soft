const assert = require('assert');
const app = require('../../src/app');

describe('\'empleados\' service', () => {
  it('registered the service', () => {
    const service = app.service('empleados');

    assert.ok(service, 'Registered the service');
  });
});
