import { routerApp } from './Route';
import { loginPage } from '../pages/login';
import { RoutePath } from './RoutePath';
import { homePage } from '../pages/home';
import { error404Page } from '../pages/404';
import { error505Page } from '../pages/505';
import { registrationPage } from '../pages/registration';

routerApp
  .use(RoutePath.messenger, homePage)
  .use(RoutePath.login, loginPage)
  .use(RoutePath.registration, registrationPage)
  // .use(RoutePath.profile, profilePage)
  // .use(RoutePath.profileEditable, profileEditablePage)
  // .use(RoutePath.profilePasswordEditable, profilePasswordEditablePage)
  .use(RoutePath.page404, error404Page)
  .use(RoutePath.page505, error505Page)
  .start();
