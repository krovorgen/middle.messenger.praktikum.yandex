import { HttpClient } from '../core/HttpClient';

export class AuthApi {
  private readonly instance = new HttpClient('https://ya-praktikum.tech/api/v2/auth');

  login(login: string, password: string) {
    return this.instance.post('/signin', { login, password });
  }
}
