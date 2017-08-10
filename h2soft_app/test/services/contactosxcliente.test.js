const assert = require('assert');
const app = require('../../src/app');

describe('\'contactosxcliente\' service', () => {
  it('registered the service', () => {
    const service = app.service('contactosxcliente');

    assert.ok(service, 'Registered the service');
  });
});
