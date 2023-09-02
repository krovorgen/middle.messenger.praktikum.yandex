import { HttpClient } from '../core/HttpClient';

export type UpdateUserDTOType = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};
export type UpdatePasswordDTOType = {
  oldPassword: string,
  newPassword: string
};

class UserApi {
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

export const userApi = new UserApi();
