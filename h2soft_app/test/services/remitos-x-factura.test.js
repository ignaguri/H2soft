const assert = require('assert');
const app = require('../../src/app');

describe('\'remitos-x-factura\' service', () => {
  it('registered the service', () => {
    const service = app.service('remitos-x-factura');

    assert.ok(service, 'Registered the service');
  });
});
