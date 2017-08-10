const assert = require('assert');
const app = require('../../src/app');

describe('\'horarios-x-objetivo\' service', () => {
  it('registered the service', () => {
    const service = app.service('horarios-x-objetivo');

    assert.ok(service, 'Registered the service');
  });
});
