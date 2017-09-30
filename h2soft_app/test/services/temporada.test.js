const assert = require('assert');
const app = require('../../src/app');

describe('\'temporada\' service', () => {
  it('registered the service', () => {
    const service = app.service('temporada');

    assert.ok(service, 'Registered the service');
  });
});
