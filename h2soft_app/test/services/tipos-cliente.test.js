const assert = require('assert');
const app = require('../../src/app');

describe('\'tiposCliente\' service', () => {
  it('registered the service', () => {
    const service = app.service('tipos-cliente');

    assert.ok(service, 'Registered the service');
  });
});
