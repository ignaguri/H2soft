const assert = require('assert');
const app = require('../../src/app');

describe('\'Localidades\' service', () => {
  it('registered the service', () => {
    const service = app.service('localidades');

    assert.ok(service, 'Registered the service');
  });
});
