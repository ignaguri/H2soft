const assert = require('assert');
const app = require('../../src/app');

describe('\'Mantenimientos\' service', () => {
  it('registered the service', () => {
    const service = app.service('mantenimientos');

    assert.ok(service, 'Registered the service');
  });
});
