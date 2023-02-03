import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';

interface LoginPageProps {
  button: Block
  link: Block
  loginField: Block
  passwordField: Block
  notifications: Block
  addClass?: string
  attr?: Record<string, string>
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
    const form: HTMLFormElement = this.element.querySelector('.auth-box__form')!;
    const formInputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input')!;

    formInputs.forEach((el) => {
      el.addEventListener('blur', () => {
        const pattern = new RegExp(el.pattern);
        if (!pattern.test(el.value)) {
          notifications.addNotification(`Для поля ${el.placeholder} необходимо:\n ${el.title}`, 'warning');
        }
      });
      el.addEventListener('focus', () => {
        const pattern = new RegExp(el.pattern);
        if (!pattern.test(el.value)) {
          notifications.addNotification(`Для поля ${el.placeholder} необходимо:\n ${el.title}`, 'warning');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        login: { value: login },
        password: { value: password },
      } = e.currentTarget! as typeof e.currentTarget & {
        login: { value: string };
        password: { value: string };
      };

      formInputs.forEach((el) => {
        if (!el.checkValidity()) {
          notifications.addNotification(el.title, 'error');
        } else {
          notifications.addNotification(`Поле ${el.placeholder} заполнено верно`, 'success');
        }
      });

      console.log({
        login,
        password,
      });
    });
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
const link = new Link({
  text: 'Назад к чатам',
  addClass: 'auth-box__link',
  size: 'sm',
  variant: 'primary',
  attr: {
    href: '../index.html',
  },
});
const loginField = new FormControl({
  type: 'text',
  name: 'login',
  placeholder: 'Логин',
  addClass: 'auth-box__label',
  pattern: checkRegexp.login.pattern,
  inputTitle: checkRegexp.login.msg,
});
const passwordField = new FormControl({
  type: 'password',
  name: 'password',
  placeholder: 'Пароль',
  addClass: 'auth-box__label',
  pattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
});

window.addEventListener('DOMContentLoaded', () => {
  const loginPage = new LoginPage({
    button,
    link,
    loginField,
    passwordField,
    notifications,
  });

  renderDom('#app', loginPage);
});
