const assert = require('assert');
const app = require('../../src/app');

describe('\'Paises\' service', () => {
  it('registered the service', () => {
    const service = app.service('paises');

    assert.ok(service, 'Registered the service');
  });
});
