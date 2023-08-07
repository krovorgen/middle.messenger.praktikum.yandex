import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { Button } from '../../components/Button';
import { NavLink } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';
import { checkValidityInput } from '../../core/checkValidityInput';
import { RoutePath } from '../../core/RoutePath';
import { AuthApi } from '../../api/Auth';
import { routerApp } from '../../core/Route';

interface LoginPageProps {
  button: Block
  link: Block
  loginField: Block
  passwordField: Block
  addClass?: string
  attr?: Record<string, string>
  events: {
    submit: (e: SubmitEvent) => void
  }
}

class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super('div', {
      ...props,
      attr: {
        class: `auth-box ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }

  _addEvents() {
    super._addEvents();
  }
}

const button = new Button({
  text: 'Авторизоваться',
  addClass: 'auth-box__submit',
  size: 'sm',
  variant: 'primary',
  attr: {
    type: 'submit',
  },
});
const link = new NavLink({
  text: 'Зарегистрироваться',
  addClass: 'auth-box__link',
  size: 'sm',
  variant: 'primary',
  to: RoutePath.registration,
});
const loginField = new FormControl({
  type: 'text',
  name: 'login',
  placeholder: 'Логин',
  addClass: 'auth-box__label',
  pattern: checkRegexp.login.pattern,
  inputTitle: checkRegexp.login.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const passwordField = new FormControl({
  type: 'password',
  name: 'password',
  placeholder: 'Пароль',
  addClass: 'auth-box__label',
  pattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});

export const loginPage = new LoginPage({
  button,
  link,
  loginField,
  passwordField,
  events: {
    async submit(e: SubmitEvent) {
      e.preventDefault();
      e.stopPropagation();
      const apiAuth = new AuthApi();

      const {
        login: { value: login },
        password: { value: password },
      } = e.target! as typeof e.target & {
        login: { value: string };
        password: { value: string };
      };

      const arrayInputs: NodeListOf<HTMLInputElement> = (e.target as HTMLFormElement).querySelectorAll('input');

      arrayInputs.forEach(checkValidityInput);

      const isCorrect = Array.from(arrayInputs).some((el) => el.checkValidity());
      if (!isCorrect) return;

      try {
        await apiAuth.login(login, password);
        notifications.addNotification('Вход выполнен успешно', 'success');
        routerApp.go(RoutePath.messenger);
      } catch (error: any) {
        notifications.addNotification(JSON.parse(error).reason, 'error');
      }
      console.log({
        login,
        password,
      });
    },
  },
});
