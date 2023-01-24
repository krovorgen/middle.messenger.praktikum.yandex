import tpl from './index.hbs';
import link from '../../components/link';
import linkBack from '../../components/link-back';
import profileAvatar from '../../components/profile-avatar';
import editedLabel from '../../components/edited-label';

document.getElementById('root')!.innerHTML = tpl({
  linkBack: linkBack(),
  profileAvatar: profileAvatar('profile-page__avatar'),
  editedEmail: editedLabel(
    'Почта',
    'pochta@yandex.ru',
    'email',
  ),
  editedLogin: editedLabel(
    'Логин',
    'ivanivanov',
    'login',
  ),
  editedFirstName: editedLabel(
    'Имя',
    'Иван',
    'first_name',
  ),
  editedSecondName: editedLabel(
    'Фамилия',
    'Иванов',
    'second_name',
  ),
  editedDisplayName: editedLabel(
    'Имя в чате',
    'Иван',
    'display_name',
  ),
  editedPhone: editedLabel(
    'Телефон',
    '+7 (909) 967 30 30',
    'phone',
  ),
  editData: link(
    '../profile-editable.hbs',
    'Изменить данные',
    '',
    'md',
    'primary',
  ),
  editPassword: link(
    '../profile-password-editable.hbs',
    'Изменить пароль',
    '',
    'md',
    'primary',
  ),
  exitBtn: link(
    '../index.html',
    'Выйти',
    '',
    'md',
    'accent',
  ),
});
