import tpl from './index.hbs';
import link from '../../components/link';
import formControl from '../../components/form-control';
import button from '../../components/button';

document.getElementById('root')!.innerHTML = tpl({
  loginField: formControl(
    'login',
    'Логин',
    'Error',
    'text',
    'auth-box__label',
  ),
  passwordField: formControl(
    'password',
    'Пароль',
    'Error',
    'password',
    'auth-box__label',
  ),
  button: button('Авторизоваться', 'submit', 'auth-box__submit'),
  link: link('../index.html', 'Назад к чатам', 'auth-box__link'),
});
