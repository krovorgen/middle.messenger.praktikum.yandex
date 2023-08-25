import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { Button } from '../../components/Button';
import { NavLink } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { checkRegexp } from '../../core/CheckRegexp';
import { notifications } from '../../components/Notification';
import { showEventValidation } from '../../core/showEventValidation';
import { checkValidityInput } from '../../core/checkValidityInput';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';
import { authController } from '../../controllers/auth.controller';

interface RegistrationPageProps extends ComponentPropsType {
}

class RegistrationPageComponent extends Block<RegistrationPageProps> {
  init() {
    this._children.button = new Button({
      text: 'Зарегистрироваться',
      addClass: 'auth-box__submit',
      size: 'sm',
      variant: 'primary',
      attr: {
        type: 'submit',
      },
    });
    this._children.link = new NavLink({
      text: 'Войти',
      addClass: 'auth-box__link',
      size: 'sm',
      variant: 'primary',
      to: RoutePath.login,
    });
    this._children.emailField = new FormControl({
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
    this._children.phoneField = new FormControl({
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
    this._children.firstNameField = new FormControl({
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
    this._children.secondNameField = new FormControl({
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
    this._children.loginField = new FormControl({
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
    this._children.passwordField = new FormControl({
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
    this._children.repeatPasswordField = new FormControl({
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
    this.props.events = {
      async submit(e: SubmitEvent) {
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

        const arrayInputs = ((e.target as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>);

        arrayInputs.forEach(checkValidityInput);

        const isCorrect = Array.from(arrayInputs).some((el) => el.checkValidity());
        if (!isCorrect) return;

        await authController.registration({
          email,
          phone,
          first_name,
          second_name,
          login,
          password,
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
      },
    };
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const RegistrationPage = RegistrationPageComponent;
