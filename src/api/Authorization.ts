import { HttpClient } from '../core/HttpClient';
import { LoginUserDTOType, RegistrationUserDTOType } from '../controllers/auth.controller';

class Authorization {
  private readonly instance = new HttpClient('https://ya-praktikum.tech/api/v2/auth');

  login(data: LoginUserDTOType) {
    return this.instance.post('/signin', data);
  }

  registration(data: RegistrationUserDTOType) {
    return this.instance.post('/signup', data);
  }

  logout() {
    return this.instance.post('/logout');
  }

  getUser() {
    return this.instance.get('/user');
  }
}

export const authApi = new Authorization();
