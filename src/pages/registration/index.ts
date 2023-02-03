import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { checkRegexp } from '../../core/CheckRegexp';
import { notifications } from '../../components/Notification';
import { showEventValidation } from '../../core/showEventValidation';

interface RegistrationPageProps {
  button: Block
  link: Block
  addClass?: string
  attr?: Record<string, string>
  emailField: Block
  phoneField: Block
  firstNameField: Block
  secondNameField: Block
  loginField: Block
  passwordField: Block
  repeatPasswordField: Block
  notifications: Block
}

const button = new Button({
  text: 'Зарегистрироваться',
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
const emailField = new FormControl({
  type: 'email',
  name: 'email',
  placeholder: 'Почта',
  addClass: 'auth-box__label',
  pattern: checkRegexp.email.pattern,
  inputTitle: checkRegexp.email.msg,
});
const phoneField = new FormControl({
  type: 'tel',
  name: 'phone',
  placeholder: 'Телефон',
  addClass: 'auth-box__label',
  pattern: checkRegexp.phone.pattern,
  inputTitle: checkRegexp.phone.msg,
});
const firstNameField = new FormControl({
  type: 'text',
  name: 'first_name',
  placeholder: 'Имя',
  addClass: 'auth-box__label',
  pattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
});
const secondNameField = new FormControl({
  type: 'text',
  name: 'second_name',
  placeholder: 'Фамилия',
  addClass: 'auth-box__label',
  pattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
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
const repeatPasswordField = new FormControl({
  type: 'password',
  name: 'repeat_password',
  placeholder: 'Пароль (ещё раз)',
  addClass: 'auth-box__label',
  pattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
});

class RegistrationPage extends Block<RegistrationPageProps> {
  constructor(props: RegistrationPageProps) {
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
      showEventValidation(el);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        email: { value: email },
        phone: { value: phone },
        first_name: { value: first_name },
        second_name: { value: second_name },
        login: { value: login },
        password: { value: password },
        repeat_password: { value: repeat_password },
      } = e.currentTarget! as typeof e.currentTarget & {
        email: { value: string };
        phone: { value: string };
        first_name: { value: string };
        second_name: { value: string };
        login: { value: string };
        password: { value: string };
        repeat_password: { value: string };
      };

      if (password !== repeat_password) {
        notifications.addNotification('Пароли не совпадают', 'warning');
        return;
      }

      formInputs.forEach((el) => {
        if (!el.checkValidity()) {
          notifications.addNotification(el.title, 'error');
        } else {
          notifications.addNotification(`Поле ${el.name} заполнено верно`, 'success');
        }
      });

      console.log({
        email,
        phone,
        first_name,
        second_name,
        login,
        password,
        repeat_password,
      });
    });
    super._addEvents();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const registrationPage = new RegistrationPage({
    button,
    link,
    emailField,
    phoneField,
    firstNameField,
    secondNameField,
    loginField,
    passwordField,
    repeatPasswordField,
    notifications,
  });

  renderDom('#app', registrationPage);
});
