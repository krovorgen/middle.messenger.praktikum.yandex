import { expect } from 'chai';
import { Block } from './Block';
import { ComponentPropsType } from '../types/componentPropsType';
import { routerApp } from './Route';
import { RoutePath } from './RoutePath';

describe('routerApp', () => {
  class LoginPage extends Block<ComponentPropsType> {
    render(): DocumentFragment {
      return new window.DocumentFragment();
    }
  }
  class RegistrationPage extends Block<ComponentPropsType> {
    render(): DocumentFragment {
      return new window.DocumentFragment();
    }
  }
  class ErrorPage extends Block<ComponentPropsType> {
    render(): DocumentFragment {
      return new window.DocumentFragment();
    }
  }

  before(() => {
    routerApp.use(RoutePath.login, LoginPage)
      .use(RoutePath.registration, RegistrationPage)
      .use(RoutePath.page404, ErrorPage)
      .start();
  });

  it('Стартовый route = /', () => {
    expect(routerApp._currentRoute?._pathname).to.eq(RoutePath.login);
  });

  it('Страница ошибки отрендерена и активна в DOM', () => {
    routerApp.render404();
    expect(routerApp._currentRoute?._pathname).to.eq(RoutePath.page404);
  });

  it('Проверка некорректного роута', () => {
    routerApp.go('/blablabla');
    expect(routerApp._currentRoute?._pathname).to.eq(RoutePath.page404);
  });
});
