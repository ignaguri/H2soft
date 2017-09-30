const assert = require('assert');
const app = require('../../src/app');

describe('\'recorridoHistorico\' service', () => {
  it('registered the service', () => {
    const service = app.service('recorrido-historico');

    assert.ok(service, 'Registered the service');
  });
});
