import { expect, use } from 'chai';
import { describe, it, afterEach } from 'mocha';
import sinonChai from 'sinon-chai';
import { SinonStub, createSandbox } from 'sinon';
import { HttpClient } from './HttpClient';

describe('HttpClient', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HttpClient;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HttpClient();
    request = sandbox.stub(http, 'createRequest').callsFake(() => Promise.resolve() as Promise<any>);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('GET с query', () => {
    const requestOptions = { offset: 1, limit: 2 };

    http.get('/users', requestOptions);
    expect(request.args[0]).to.be.deep.eq([
      'GET',
      'https://ya-praktikum.tech/api/v2/users?offset=1&limit=2',
      undefined,
    ]);
  });

  it('GET без query', () => {
    http.get('/users');
    expect(request.args[0]).to.be.deep.eq([
      'GET',
      'https://ya-praktikum.tech/api/v2/users',
      undefined,
    ]);
  });

  it('POST', () => {
    const data = { username: 'hi', password: 'reviewer' };

    http.post('/users', data);
    expect(request.args[0]).to.be.deep.eq([
      'POST',
      'https://ya-praktikum.tech/api/v2/users',
      data,
      undefined,
    ]);
  });

  it('PUT', () => {
    const data = { username: 'Поставьте апрув', password: 'Пожалуйста :(' };

    http.put('/users', data);
    expect(request.args[0]).to.be.deep.eq([
      'PUT',
      'https://ya-praktikum.tech/api/v2/users',
      data,
      undefined,
    ]);
  });

  it('DELETE', () => {
    const data = { id: 1 };

    http.delete('/users', data);
    expect(request.args[0]).to.be.deep.eq([
      'DELETE',
      'https://ya-praktikum.tech/api/v2/users',
      data,
    ]);
  });
});
