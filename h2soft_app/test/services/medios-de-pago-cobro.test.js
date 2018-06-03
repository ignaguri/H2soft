const assert = require('assert');
const app = require('../../src/app');

describe('\'mediosDePagoCobro\' service', () => {
  it('registered the service', () => {
    const service = app.service('medios-de-pago-cobro');

    assert.ok(service, 'Registered the service');
  });
});
