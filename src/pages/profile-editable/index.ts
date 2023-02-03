import tpl from './index.hbs';
import { renderDom } from '../../core/renderDom';
import { Block } from '../../core/Block';
import { LinkBack } from '../../components/LinkBack';
import { EditedLabel } from '../../components/EditedLabel';
import { Button } from '../../components/Button';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import avatarStub from '../../../static/icons/not-avatar.svg';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';

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
  notifications: Block
  addClass?: string
  attr?: Record<string, string>
}

class ProfileEditablePage extends Block<ProfileEditablePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }

  _addEvents() {
    const form: HTMLFormElement = this.element.querySelector('.border-list__form')!;
    const formInputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input')!;

    formInputs.forEach((el) => {
      showEventValidation(el);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        email: { value: email },
        login: { value: login },
        first_name: { value: first_name },
        second_name: { value: second_name },
        display_name: { value: display_name },
        phone: { value: phone },
      } = e.currentTarget! as typeof e.currentTarget & {
        email: { value: string };
        login: { value: string };
        first_name: { value: string };
        second_name: { value: string };
        display_name: { value: string };
        phone: { value: string };
      };

      formInputs.forEach((el) => {
        if (!el.checkValidity()) {
          notifications.addNotification(el.title, 'error');
        } else {
          notifications.addNotification(`Поле ${el.name} заполнено верно`, 'success');
        }
      });

      console.log({
        email,
        login,
        first_name,
        second_name,
        display_name,
        phone,
      });
    });
    super._addEvents();
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
  inputPattern: checkRegexp.email.pattern,
  inputTitle: checkRegexp.email.msg,
});
const editedLogin = new EditedLabel({
  text: 'Логин',
  editable: true,
  value: 'ivanivanov',
  type: 'text',
  name: 'login',
  inputPattern: checkRegexp.login.pattern,
  inputTitle: checkRegexp.login.msg,
});
const editedFirstName = new EditedLabel({
  text: 'Имя',
  editable: true,
  value: 'Maksim',
  type: 'text',
  name: 'first_name',
  inputPattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
});
const editedSecondName = new EditedLabel({
  text: 'Фамилия',
  editable: true,
  value: 'Berezka',
  type: 'text',
  name: 'second_name',
  inputPattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
});
const editedDisplayName = new EditedLabel({
  text: 'Имя в чате',
  editable: true,
  value: 'Krovorgen',
  type: 'text',
  name: 'display_name',
  inputPattern: checkRegexp.message.pattern,
  inputTitle: checkRegexp.message.msg,
});
const editedPhone = new EditedLabel({
  text: 'Телефон',
  editable: true,
  value: '+79099673030',
  type: 'tel',
  name: 'phone',
  inputPattern: checkRegexp.phone.pattern,
  inputTitle: checkRegexp.phone.msg,
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
    notifications,
  });

  renderDom('#app', profileEditablePage);
});
