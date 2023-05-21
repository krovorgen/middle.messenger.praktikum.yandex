import { Router } from './Route';
import { error404Page } from '../pages/404';
import { error505Page } from '../pages/505';
import { homePage } from '../pages/home';
import { profilePage } from '../pages/profile';
import { registrationPage } from '../pages/registration';
import { loginPage } from '../pages/login';
import { profileEditablePage } from '../pages/profile-editable';
import { profilePasswordEditablePage } from '../pages/profile-password-editable';
import { RoutePath } from './RoutePath';

const router = new Router('#app');

router
  .use(RoutePath.messenger, homePage)
  .use(RoutePath.login, loginPage)
  .use(RoutePath.registration, registrationPage)
  .use(RoutePath.profile, profilePage)
  .use(RoutePath.profileEditable, profileEditablePage)
  .use(RoutePath.profilePasswordEditable, profilePasswordEditablePage)
  .use(RoutePath.page404, error404Page)
  .use(RoutePath.page505, error505Page)
  .start();
