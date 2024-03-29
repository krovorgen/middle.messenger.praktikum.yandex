import { notifications } from '../components/Notification';
import { routerApp } from '../core/Route';
import { RoutePath } from '../core/RoutePath';
import { UpdatePasswordDTOType, UpdateUserDTOType, userApi } from '../api/user.api';
import { authController } from './auth.controller';
import { store } from '../core/Store';

class UserController {
  private readonly api: typeof userApi;

  constructor() {
    this.api = userApi;
  }

  updateUser = async (data: UpdateUserDTOType) => {
    try {
      await this.api.updateUser(data);
      await authController.getUser();
      notifications.addNotification('Данные успешно обновлены', 'success');
      routerApp.go(RoutePath.profile);
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };

  updatePassword = async (data: UpdatePasswordDTOType) => {
    try {
      await this.api.updatePassword(data);
      notifications.addNotification('Пароль успешно обновлен', 'success');
      routerApp.go(RoutePath.profile);
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };

  updateAvatar = async (avatar: File) => {
    try {
      const user = await this.api.updateAvatar(avatar);
      store.set('user', user);
      notifications.addNotification('Аватар успешно обновлен', 'success');
      routerApp.go(RoutePath.profile);
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };
}

export const userController = new UserController();
