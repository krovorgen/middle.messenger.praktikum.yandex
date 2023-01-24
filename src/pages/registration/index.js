import tpl from './index.hbs';
import link from '../../components/link';
import formControl from '../../components/form-control';
import button from '../../components/button';

document.getElementById('root').innerHTML = tpl({
  emailField: formControl(
    'email',
    'Почта',
    null,
    'email',
    'auth-box__label',
  ),
  phoneField: formControl(
    'phone',
    'Телефон',
    null,
    'tel',
    'auth-box__label',
  ),
  firstNameField: formControl(
    'first_name',
    'Имя',
    null,
    'text',
    'auth-box__label',
  ),
  secondNameField: formControl(
    'second_name',
    'Фамилия',
    null,
    'text',
    'auth-box__label',
  ),
  loginField: formControl(
    'login',
    'Логин',
    null,
    'text',
    'auth-box__label',
  ),
  passwordField: formControl(
    'password',
    'Пароль',
    null,
    'password',
    'auth-box__label',
  ),
  repeatPasswordField: formControl(
    'repeat_password',
    'Пароль (ещё раз)',
    null,
    'password',
    'auth-box__label',
  ),
  button: button('Зарегистрироваться', 'submit', 'auth-box__submit'),
  link: link('../index.html', 'Назад к чатам', 'auth-box__link'),
});
