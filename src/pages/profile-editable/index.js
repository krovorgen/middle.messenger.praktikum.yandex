import tpl from './index.hbs';
import button from '../../components/button';
import linkBack from '../../components/link-back';
import profileAvatar from '../../components/profile-avatar';
import editedLabel from '../../components/edited-label';

document.getElementById('root').innerHTML = tpl({
  linkBack: linkBack('../index.html', 'Назад к чатам', 'error-page__link'),
  profileAvatar: profileAvatar('profile-page__avatar'),
  editedEmail: editedLabel(
    'Почта',
    'pochta@yandex.ru',
    'email',
    true,
    'email',
  ),
  editedLogin: editedLabel(
    'Логин',
    'ivanivanov',
    'login',
    true,
  ),
  editedFirstName: editedLabel(
    'Имя',
    'Иван',
    'first_name',
    true,
  ),
  editedSecondName: editedLabel(
    'Фамилия',
    'Иванов',
    'second_name',
    true,
  ),
  editedDisplayName: editedLabel(
    'Имя в чате',
    'Иван',
    'display_name',
    true,
  ),
  editedPhone: editedLabel(
    'Телефон',
    '+7 (909) 967 30 30',
    'phone',
    true,
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
