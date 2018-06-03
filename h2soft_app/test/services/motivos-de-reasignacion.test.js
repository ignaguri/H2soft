const assert = require('assert');
const app = require('../../src/app');

describe('\'motivos-de-reasignacion\' service', () => {
  it('registered the service', () => {
    const service = app.service('motivos-de-reasignacion');

    assert.ok(service, 'Registered the service');
  });
});
