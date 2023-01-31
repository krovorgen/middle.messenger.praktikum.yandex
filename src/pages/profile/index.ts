import tpl from './index.hbs';
import { renderDom } from '../../utils/renderDom';
import { Block } from '../../utils/Block';
import { LinkBack } from '../../components/link-back';
import { Link } from '../../components/link';
import { EditedLabel } from '../../components/edited-label';

interface ProfilePageProps {
  linkBack: Block
  editData: Block
  editPassword: Block
  exitBtn: Block
  editedEmail: Block
  editedLogin: Block
  editedFirstName: Block
  editedSecondName: Block
  editedDisplayName: Block
  editedPhone: Block
  addClass?: string
  attr?: Record<string, string>
}

class ProfilePage extends Block<ProfilePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const linkBack = new LinkBack({});
const editData = new Link({
  size: 'md',
  variant: 'primary',
  text: 'Изменить данные',
  attr: {
    href: '../profile-editable/index.html',
  },
});
const editPassword = new Link({
  size: 'md',
  variant: 'primary',
  text: 'Изменить пароль',
  attr: {
    href: '../profile-password-editable/index.html',
  },
});
const exitBtn = new Link({
  size: 'md',
  variant: 'accent',
  text: 'Выйти',
  attr: {
    href: '../index.html',
  },
});
const editedEmail = new EditedLabel({
  text: 'Почта',
  editable: false,
  value: 'pochta@yandex.ru',
});
const editedLogin = new EditedLabel({
  text: 'Логин',
  editable: false,
  value: 'ivanivanov',
});
const editedFirstName = new EditedLabel({
  text: 'Имя',
  editable: false,
  value: 'Иван',
});
const editedSecondName = new EditedLabel({
  text: 'Фамилия',
  editable: false,
  value: 'Иванов',
});
const editedDisplayName = new EditedLabel({
  text: 'Имя в чате',
  editable: false,
  value: 'Иван',
});
const editedPhone = new EditedLabel({
  text: 'Телефон',
  editable: false,
  value: '+7 (909) 967 30 30',
});

window.addEventListener('DOMContentLoaded', () => {
  const profilePage = new ProfilePage('div', {
    linkBack,
    editData,
    editPassword,
    exitBtn,
    editedEmail,
    editedLogin,
    editedFirstName,
    editedSecondName,
    editedDisplayName,
    editedPhone,
  });

  renderDom('#app', profilePage);
});
