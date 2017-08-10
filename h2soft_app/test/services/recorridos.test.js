const assert = require('assert');
const app = require('../../src/app');

describe('\'recorridos\' service', () => {
  it('registered the service', () => {
    const service = app.service('recorridos');

    assert.ok(service, 'Registered the service');
  });
});
