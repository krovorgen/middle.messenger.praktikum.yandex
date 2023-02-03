import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { checkRegexp } from '../../core/CheckRegexp';
import { notifications } from '../../components/Notification';
import { showEventValidation } from '../../core/showEventValidation';
import { checkValidityInput } from '../../core/checkValidityInput';

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
  events: {
    submit: (e: SubmitEvent) => void
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
  pattern: checkRegexp.email.pattern,
  inputTitle: checkRegexp.email.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const phoneField = new FormControl({
  type: 'tel',
  name: 'phone',
  placeholder: 'Телефон',
  addClass: 'auth-box__label',
  pattern: checkRegexp.phone.pattern,
  inputTitle: checkRegexp.phone.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const firstNameField = new FormControl({
  type: 'text',
  name: 'first_name',
  placeholder: 'Имя',
  addClass: 'auth-box__label',
  pattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const secondNameField = new FormControl({
  type: 'text',
  name: 'second_name',
  placeholder: 'Фамилия',
  addClass: 'auth-box__label',
  pattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
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
const repeatPasswordField = new FormControl({
  type: 'password',
  name: 'repeat_password',
  placeholder: 'Пароль (ещё раз)',
  addClass: 'auth-box__label',
  pattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
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
    events: {
      submit(e) {
        e.preventDefault();
        e.stopPropagation();

        const {
          email: { value: email },
          phone: { value: phone },
          first_name: { value: first_name },
          second_name: { value: second_name },
          login: { value: login },
          password: { value: password },
          repeat_password: { value: repeat_password },
        } = e.target! as typeof e.target & {
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

        ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>).forEach(checkValidityInput);

        console.log({
          email,
          phone,
          first_name,
          second_name,
          login,
          password,
          repeat_password,
        });
      },
    },
  });

  renderDom('#app', registrationPage);
});
