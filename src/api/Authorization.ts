import { HttpClient } from '../core/HttpClient';
import { LoginUserDTOType, RegistrationUserDTOType } from '../controllers/auth.controller';

class Authorization {
  private readonly instance = new HttpClient();

  login(data: LoginUserDTOType) {
    return this.instance.post('/auth/signin', data);
  }

  registration(data: RegistrationUserDTOType) {
    return this.instance.post('/auth/signup', data);
  }

  logout() {
    return this.instance.post('/auth/logout');
  }

  getUser() {
    return this.instance.get('/auth/user');
  }
}

export const authApi = new Authorization();
