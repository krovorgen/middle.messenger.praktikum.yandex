import { HttpClient } from '../core/HttpClient';
import { UpdateUserDTOType, UpdatePasswordDTOType } from '../controllers/user.controller';

class User {
  private readonly instance = new HttpClient('https://ya-praktikum.tech/api/v2/user');

  updateUser(data: UpdateUserDTOType) {
    return this.instance.put('/profile', data);
  }

  updatePassword(data: UpdatePasswordDTOType) {
    return this.instance.put('/password', data);
  }
}

export const userApi = new User();
