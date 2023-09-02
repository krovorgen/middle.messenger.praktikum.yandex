import { authApi, LoginUserDTOType, RegistrationUserDTOType } from '../api/auth.api';
import { notifications } from '../components/Notification';
import { routerApp } from '../core/Route';
import { RoutePath } from '../core/RoutePath';
import { store } from '../core/Store';

class AuthController {
  private readonly api: typeof authApi;

  constructor() {
    this.api = authApi;
  }

  login = async (data: LoginUserDTOType) => {
    try {
      await this.api.login(data);
      await this.getUser();
      notifications.addNotification('Вход выполнен успешно', 'success');
      routerApp.go(RoutePath.profile);
    } catch (error: any) {
      notifications.addNotification(JSON.parse(error).reason, 'error');
    }
  };

  registration = async (data: RegistrationUserDTOType) => {
    try {
      await this.api.registration(data);
      notifications.addNotification('Регистрация прошла успешно', 'success');
      routerApp.go(RoutePath.messenger);
    } catch (error: any) {
      notifications.addNotification(JSON.parse(error).reason, 'error');
    }
  };

  logout = async () => {
    await this.api.logout();
    routerApp.go('/');
  };

  getUser = async () => {
    const user = await this.api.getUser();
    store.set('user', user);
  };
}

export const authController = new AuthController();
