import tpl from './index.hbs';
import { Button } from '../../components/Button';
import { LinkBack } from '../../components/LinkBack';
import { EditedLabel } from '../../components/EditedLabel';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import avatarStub from '../../../static/icons/not-avatar.svg';

//   profileAvatar: profileAvatar('profile-page__avatar'),

interface ProfilePasswordEditablePageProps {
  linkBack: Block
  profileAvatar: Block
  oldPassword: Block
  newPassword: Block
  repeatPassword: Block
  saveBtn: Block
  addClass?: string
  attr?: Record<string, string>
}

class ProfilePasswordEditablePage extends Block<ProfilePasswordEditablePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const linkBack = new LinkBack({});
const profileAvatar = new ProfileAvatar({ avatarPath: avatarStub, login: 'Иван' });
const oldPassword = new EditedLabel({
  text: 'Старый пароль',
  editable: true,
  value: '123',
  type: 'password',
  name: 'oldPassword',
});
const newPassword = new EditedLabel({
  text: 'Новый пароль',
  editable: true,
  value: 'qwerty',
  type: 'password',
  name: 'newPassword',
});
const repeatPassword = new EditedLabel({
  text: 'Повторите новый пароль',
  editable: true,
  value: 'qwerty',
  type: 'repeat_password',
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
  const profilePasswordEditablePage = new ProfilePasswordEditablePage('div', {
    linkBack,
    profileAvatar,
    oldPassword,
    newPassword,
    repeatPassword,
    saveBtn,
  });

  renderDom('#app', profilePasswordEditablePage);
});
