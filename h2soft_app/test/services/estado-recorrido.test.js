const assert = require('assert');
const app = require('../../src/app');

describe('\'estado-recorrido\' service', () => {
  it('registered the service', () => {
    const service = app.service('estadorecorrido');

    assert.ok(service, 'Registered the service');
  });
});
