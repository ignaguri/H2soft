const assert = require('assert');
const app = require('../../src/app');

describe('\'dias\' service', () => {
  it('registered the service', () => {
    const service = app.service('dias');

    assert.ok(service, 'Registered the service');
  });
});
