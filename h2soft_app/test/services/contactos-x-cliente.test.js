const assert = require('assert');
const app = require('../../src/app');

describe('\'contactos-x-cliente\' service', () => {
  it('registered the service', () => {
    const service = app.service('contactos-x-cliente');

    assert.ok(service, 'Registered the service');
  });
});
