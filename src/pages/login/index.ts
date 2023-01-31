import tpl from './index.hbs';
import { Block } from '../../utils/Block';
import { renderDom } from '../../utils/renderDom';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { FormControl } from '../../components/form-control';

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
  const homePage = new LoginPage({
    button,
    link,
    loginField,
    passwordField,
  });

  renderDom('#app', homePage);
});
