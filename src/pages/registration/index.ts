import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { FormControl } from '../../components/form-control';

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
}

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
});
const phoneField = new FormControl({
  type: 'tel',
  name: 'phone',
  placeholder: 'Телефон',
  addClass: 'auth-box__label',
});
const firstNameField = new FormControl({
  type: 'text',
  name: 'first_name',
  placeholder: 'Имя',
  addClass: 'auth-box__label',
});
const secondNameField = new FormControl({
  type: 'text',
  name: 'second_name',
  placeholder: 'Фамилия',
  addClass: 'auth-box__label',
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
const repeatPasswordField = new FormControl({
  type: 'password',
  name: 'repeat_password',
  placeholder: 'Пароль (ещё раз)',
  addClass: 'auth-box__label',
});

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
  });

  renderDom('#app', registrationPage);
});
