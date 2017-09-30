const assert = require('assert');
const app = require('../../src/app');

describe('\'estadosRecorrido\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados-recorrido');

    assert.ok(service, 'Registered the service');
  });
});
