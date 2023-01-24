import tpl from './index.hbs';
import link from '../../components/link';
import linkBack from '../../components/link-back';
import profileAvatar from '../../components/profile-avatar';
import editedLabel from '../../components/edited-label';

document.getElementById('root').innerHTML = tpl({
  linkBack: linkBack('../index.html', 'Назад к чатам', 'error-page__link'),
  profileAvatar: profileAvatar('profile-page__avatar'),
  editedEmail: editedLabel('Почта', 'pochta@yandex.ru'),
  editedLogin: editedLabel('Логин', 'ivanivanov'),
  editedFirstName: editedLabel('Имя', 'Иван'),
  editedSecondName: editedLabel('Фамилия', 'Иванов'),
  editedDisplayName: editedLabel('Имя в чате', 'Иван'),
  editedPhone: editedLabel('Телефон', '+7 (909) 967 30 30'),
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
