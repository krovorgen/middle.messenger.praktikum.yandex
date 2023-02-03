import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { FormControl } from '../../components/FormControl';

interface LoginPageProps {
  button: Block
  link: Block
  loginField: Block
  passwordField: Block
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
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        login: { value: login },
        password: { value: password },
      } = e.currentTarget! as typeof e.currentTarget & {
        login: { value: string };
        password: { value: string };
      };

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
});
const passwordField = new FormControl({
  type: 'password',
  name: 'password',
  placeholder: 'Пароль',
  addClass: 'auth-box__label',
});

window.addEventListener('DOMContentLoaded', () => {
  const loginPage = new LoginPage({
    button,
    link,
    loginField,
    passwordField,
  });

  renderDom('#app', loginPage);
});
