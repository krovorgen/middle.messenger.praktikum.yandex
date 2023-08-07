import { HttpClient } from '../core/HttpClient';

export class AuthApi {
  private readonly instance = new HttpClient('https://ya-praktikum.tech/api/v2/auth');

  login(login: string, password: string) {
    return this.instance.post('/signin', { login, password });
  }

  registration(
    email: string,
    phone: string,
    first_name: string,
    second_name: string,
    login: string,
    password: string,
  ) {
    return this.instance.post('/signup', {
      email,
      phone,
      first_name,
      second_name,
      login,
      password,
    });
  }
}
