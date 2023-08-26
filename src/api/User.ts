import { HttpClient } from '../core/HttpClient';
import { UpdateUserDTOType, UpdatePasswordDTOType } from '../controllers/user.controller';

class User {
  private readonly instance = new HttpClient();

  updateUser(data: UpdateUserDTOType) {
    return this.instance.put('/user/profile', data);
  }

  updatePassword(data: UpdatePasswordDTOType) {
    return this.instance.put('/user/password', data);
  }

  updateAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.instance.put('/user/profile/avatar', formData);
  }
}

export const userApi = new User();
