const assert = require('assert');
const app = require('../../src/app');

describe('\'objetivos-x-cliente\' service', () => {
  it('registered the service', () => {
    const service = app.service('objetivos-x-cliente');

    assert.ok(service, 'Registered the service');
  });
});
