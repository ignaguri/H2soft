const assert = require('assert');
const app = require('../../src/app');

describe('\'estados-alerta\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados-alerta');

    assert.ok(service, 'Registered the service');
  });
});
