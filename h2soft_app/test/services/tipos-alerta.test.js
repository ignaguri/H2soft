const assert = require('assert');
const app = require('../../src/app');

describe('\'tipos-alerta\' service', () => {
  it('registered the service', () => {
    const service = app.service('tipos-alerta');

    assert.ok(service, 'Registered the service');
  });
});
