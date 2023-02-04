import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';
import { checkValidityInput } from '../../core/checkValidityInput';

interface LoginPageProps {
  button: Block
  link: Block
  loginField: Block
  passwordField: Block
  notifications: Block
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

window.addEventListener('DOMContentLoaded', () => {
  const loginPage = new LoginPage({
    button,
    link,
    loginField,
    passwordField,
    notifications,
    events: {
      submit(e: SubmitEvent) {
        e.preventDefault();
        e.stopPropagation();

        const {
          login: { value: login },
          password: { value: password },
        } = e.target! as typeof e.target & {
          login: { value: string };
          password: { value: string };
        };

        ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>).forEach(checkValidityInput);

        console.log({
          login,
          password,
        });
      },
    },
  });

  renderDom('#app', loginPage);
});
