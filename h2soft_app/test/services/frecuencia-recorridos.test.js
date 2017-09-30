const assert = require('assert');
const app = require('../../src/app');

describe('\'frecuenciaRecorridos\' service', () => {
  it('registered the service', () => {
    const service = app.service('frecuencia-recorridos');

    assert.ok(service, 'Registered the service');
  });
});
