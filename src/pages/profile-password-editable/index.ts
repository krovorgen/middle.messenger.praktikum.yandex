import tpl from './index.hbs';
import { Button } from '../../components/button';
import { LinkBack } from '../../components/link-back';
import { EditedLabel } from '../../components/edited-label';
import { Block } from '../../utils/Block';
import { renderDom } from '../../utils/renderDom';

//   profileAvatar: profileAvatar('profile-page__avatar'),

interface ProfilePasswordEditablePageProps {
  linkBack: Block
  saveBtn: Block
  oldPassword: Block
  newPassword: Block
  repeatPassword: Block
  addClass?: string
  attr?: Record<string, string>
}

class ProfilePasswordEditablePage extends Block<ProfilePasswordEditablePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const linkBack = new LinkBack({});
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
    oldPassword,
    newPassword,
    repeatPassword,
    saveBtn,
  });

  renderDom('#app', profilePasswordEditablePage);
});
