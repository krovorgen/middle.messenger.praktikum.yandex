import { routerApp } from './Route';
import { RoutePath } from './RoutePath';
import { HomePage } from '../pages/home';
import { ProfilePage } from '../pages/profile';
import { authController } from '../controllers/auth.controller';
import { Error404Page } from '../pages/404';
import { Error505Page } from '../pages/505';
import { LoginPage } from '../pages/login';
import { RegistrationPage } from '../pages/registration';
import { ProfileEditablePage } from '../pages/profile-editable';
import { ProfilePasswordEditablePage } from '../pages/profile-password-editable';
import { chatController } from '../controllers/chat.controller';

document.addEventListener('DOMContentLoaded', async () => {
  routerApp
    .use(RoutePath.messenger, HomePage)
    .use(RoutePath.login, LoginPage)
    .use(RoutePath.registration, RegistrationPage)
    .use(RoutePath.profile, ProfilePage)
    .use(RoutePath.profileEditable, ProfileEditablePage)
    .use(RoutePath.profilePasswordEditable, ProfilePasswordEditablePage)
    .use(RoutePath.page404, Error404Page)
    .use(RoutePath.page505, Error505Page);

  let isPrivateRoute = true;

  if (([RoutePath.login, RoutePath.registration] as string[]).includes(window.location.pathname)) {
    isPrivateRoute = false;
  }

  try {
    await authController.getUser();
    await chatController.getChats();
    routerApp.start();

    if (!isPrivateRoute) {
      routerApp.go(RoutePath.profile);
    }
  } catch (e) {
    routerApp.start();

    if (isPrivateRoute) {
      routerApp.go(RoutePath.login);
    }
  }
});
