import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { Button } from '../../components/Button';
import { NavLink } from '../../components/Link';
import { FormControl } from '../../components/FormControl';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';
import { checkValidityInput } from '../../core/checkValidityInput';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';
import { authController } from '../../controllers/auth.controller';

interface LoginPageProps extends ComponentPropsType {
  events: {
    submit: (e: SubmitEvent) => void
  }
}

class LoginPageComponent extends Block< LoginPageProps> {
  init() {
    this._children.button = new Button({
      text: 'Авторизоваться',
      addClass: 'auth-box__submit',
      size: 'sm',
      block: true,
      variant: 'primary',
      attr: {
        type: 'submit',
      },
    });

    this._children.link = new NavLink({
      text: 'Зарегистрироваться',
      addClass: 'auth-box__link',
      size: 'sm',
      variant: 'primary',
      to: RoutePath.registration,
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

    this.props.events = {
      async submit(e: SubmitEvent) {
        e.preventDefault();
        e.stopPropagation();

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

        await authController.login({ login, password });

        console.log({
          login,
          password,
        });
      },
    };
  }

  render() {
    return this.compile(tpl, this.props);
  }

  _addEvents() {
    super._addEvents();
  }
}

export const LoginPage = LoginPageComponent;
