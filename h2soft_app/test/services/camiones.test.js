const assert = require('assert');
const app = require('../../src/app');

describe('\'camiones\' service', () => {
  it('registered the service', () => {
    const service = app.service('camiones');

    assert.ok(service, 'Registered the service');
  });
});
