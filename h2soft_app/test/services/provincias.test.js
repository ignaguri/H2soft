const assert = require('assert');
const app = require('../../src/app');

describe('\'Provincias\' service', () => {
  it('registered the service', () => {
    const service = app.service('provincias');

    assert.ok(service, 'Registered the service');
  });
});
