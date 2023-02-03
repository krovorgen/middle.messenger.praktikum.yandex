import tpl from './index.hbs';
import { Button } from '../../components/Button';
import { LinkBack } from '../../components/LinkBack';
import { EditedLabel } from '../../components/EditedLabel';
import { Block } from '../../core/Block';
import { renderDom } from '../../core/renderDom';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import avatarStub from '../../../static/icons/not-avatar.svg';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';

interface ProfilePasswordEditablePageProps {
  linkBack: Block
  profileAvatar: Block
  oldPassword: Block
  newPassword: Block
  repeatPassword: Block
  saveBtn: Block
  notifications: Block
  addClass?: string
  attr?: Record<string, string>
}

class ProfilePasswordEditablePage extends Block<ProfilePasswordEditablePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }

  _addEvents() {
    const form: HTMLFormElement = this.element.querySelector('.border-list__form')!;
    const formInputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input')!;

    formInputs.forEach((el) => {
      el.addEventListener('blur', () => {
        const pattern = new RegExp(el.pattern);
        if (!pattern.test(el.value)) {
          notifications.addNotification(`Для поля ${el.placeholder} необходимо:\n ${el.title}`, 'warning');
        }
      });
      el.addEventListener('focus', () => {
        const pattern = new RegExp(el.pattern);
        if (!pattern.test(el.value)) {
          notifications.addNotification(`Для поля ${el.placeholder} необходимо:\n ${el.title}`, 'warning');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        oldPassword: { value: oldPassword },
        newPassword: { value: newPassword },
        repeat_password: { value: repeat_password },
      } = e.currentTarget! as typeof e.currentTarget & {
        oldPassword: { value: string };
        newPassword: { value: string };
        repeat_password: { value: string };
      };

      if (repeat_password !== newPassword) {
        notifications.addNotification('Пароли не совпадают', 'warning');
        return;
      }

      formInputs.forEach((el) => {
        if (!el.checkValidity()) {
          notifications.addNotification(el.title, 'error');
        } else {
          notifications.addNotification(`Поле ${el.name} заполнено верно`, 'success');
        }
      });

      console.log({
        oldPassword,
        newPassword,
        repeat_password,
      });
    });
    super._addEvents();
  }
}

const linkBack = new LinkBack({});
const profileAvatar = new ProfileAvatar({ avatarPath: avatarStub, login: 'Иван' });
const oldPassword = new EditedLabel({
  text: 'Старый пароль',
  editable: true,
  value: '123123123A',
  type: 'password',
  name: 'oldPassword',
  inputPattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
});
const newPassword = new EditedLabel({
  text: 'Новый пароль',
  editable: true,
  value: '1234567890A',
  type: 'password',
  name: 'newPassword',
  inputPattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
});
const repeatPassword = new EditedLabel({
  text: 'Повторите новый пароль',
  editable: true,
  value: '1234567890A',
  type: 'password',
  name: 'repeat_password',
  inputPattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
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
    notifications,
  });

  renderDom('#app', profilePasswordEditablePage);
});
