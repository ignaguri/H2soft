const assert = require('assert');
const app = require('../../src/app');

describe('\'remitos\' service', () => {
  it('registered the service', () => {
    const service = app.service('remitos');

    assert.ok(service, 'Registered the service');
  });
});
