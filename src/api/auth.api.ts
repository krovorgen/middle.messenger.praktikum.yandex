import { HttpClient } from '../core/HttpClient';

export type LoginUserDTOType = {
  login: string;
  password: string;
};
export type RegistrationUserDTOType = {
  email: string;
  phone: string;
  first_name: string;
  second_name: string;
  login: string;
  password: string;
};

class AuthApi {
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

export const authApi = new AuthApi();
