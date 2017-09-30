const assert = require('assert');
const app = require('../../src/app');

describe('\'estadosRemito\' service', () => {
  it('registered the service', () => {
    const service = app.service('estados-remito');

    assert.ok(service, 'Registered the service');
  });
});
