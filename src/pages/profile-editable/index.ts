import tpl from './index.hbs';
import { renderDom } from '../../core/renderDom';
import { Block } from '../../core/Block';
import { LinkBack } from '../../components/link-back';
import { EditedLabel } from '../../components/edited-label';
import { Button } from '../../components/button';
import { ProfileAvatar } from '../../components/profile-avatar';
import avatarStub from '../../../static/icons/not-avatar.svg';

interface ProfileEditablePageProps {
  linkBack: Block
  profileAvatar: Block
  saveBtn: Block
  editedEmail: Block
  editedLogin: Block
  editedFirstName: Block
  editedSecondName: Block
  editedDisplayName: Block
  editedPhone: Block
  addClass?: string
  attr?: Record<string, string>
}

class ProfileEditablePage extends Block<ProfileEditablePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const linkBack = new LinkBack({});
const profileAvatar = new ProfileAvatar({ avatarPath: avatarStub, login: 'Иван' });
const editedEmail = new EditedLabel({
  text: 'Почта',
  editable: true,
  value: 'pochta@yandex.ru',
  type: 'email',
  name: 'email',
});
const editedLogin = new EditedLabel({
  text: 'Логин',
  editable: true,
  value: 'ivanivanov',
  type: 'text',
  name: 'login',
});
const editedFirstName = new EditedLabel({
  text: 'Имя',
  editable: true,
  value: 'Иван',
  type: 'text',
  name: 'first_name',
});
const editedSecondName = new EditedLabel({
  text: 'Фамилия',
  editable: true,
  value: 'Иванов',
  type: 'text',
  name: 'second_name',
});
const editedDisplayName = new EditedLabel({
  text: 'Имя в чате',
  editable: true,
  value: 'Иван',
  type: 'text',
  name: 'display_name',
});
const editedPhone = new EditedLabel({
  text: 'Телефон',
  editable: true,
  value: '+7 (909) 967 30 30',
  type: 'tel',
  name: 'phone',
});
const saveBtn = new Button({
  size: 'sm',
  variant: 'primary',
  center: true,
  text: 'Сохранить',
  attr: {
    type: 'submit',
  },
});

window.addEventListener('DOMContentLoaded', () => {
  const profileEditablePage = new ProfileEditablePage('div', {
    linkBack,
    profileAvatar,
    editedEmail,
    editedLogin,
    editedFirstName,
    editedSecondName,
    editedDisplayName,
    editedPhone,
    saveBtn,
  });

  renderDom('#app', profileEditablePage);
});
