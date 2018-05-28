const assert = require('assert');
const app = require('../../src/app');

describe('\'Caja_Total\' service', () => {
  it('registered the service', () => {
    const service = app.service('caja-total');

    assert.ok(service, 'Registered the service');
  });
});
