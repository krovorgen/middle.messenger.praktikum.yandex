import tpl from './index.hbs';
import button from '../../components/button';
import linkBack from '../../components/link-back';
import profileAvatar from '../../components/profile-avatar';
import editedLabel from '../../components/edited-label';

document.getElementById('root')!.innerHTML = tpl({
  linkBack: linkBack(),
  profileAvatar: profileAvatar('profile-page__avatar'),
  oldPassword: editedLabel(
    'Старый пароль',
    '123',
    'oldPassword',
    true,
    'password',
  ),
  newPassword: editedLabel(
    'Новый пароль',
    'qwerty',
    'newPassword',
    true,
    'password',
  ),
  repeatPassword: editedLabel(
    'Повторите новый пароль',
    'qwerty',
    'repeat_password',
    true,
    'password',
  ),
  saveBtn: button(
    'Сохранить',
    'submit',
    '',
    'sm',
    'primary',
    true,
  ),
});
