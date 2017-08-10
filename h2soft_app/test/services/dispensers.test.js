const assert = require('assert');
const app = require('../../src/app');

describe('\'dispensers\' service', () => {
  it('registered the service', () => {
    const service = app.service('dispensers');

    assert.ok(service, 'Registered the service');
  });
});
