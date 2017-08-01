const assert = require('assert');
const app = require('../../src/app');

describe('\'contrato\' service', () => {
  it('registered the service', () => {
    const service = app.service('contrato');

    assert.ok(service, 'Registered the service');
  });
});
