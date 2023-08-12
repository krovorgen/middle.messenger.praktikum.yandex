import tpl from './index.hbs';
import { Button } from '../../components/Button';
import { LinkBack } from '../../components/LinkBack';
import { EditedLabel } from '../../components/EditedLabel';
import { Block } from '../../core/Block';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import avatarStub from '../../../static/icons/not-avatar.svg';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';
import { Modal } from '../../core/Modal';
import { LoadImg } from '../../components/AvatarLoading';
import { checkValidityInput } from '../../core/checkValidityInput';
import { ComponentPropsType } from '../../types/componentPropsType';

interface ProfilePasswordEditablePageProps extends ComponentPropsType {
  linkBack: Block
  profileAvatar: Block
  oldPasswordInput: Block
  newPasswordInput: Block
  repeatPasswordInput: Block
  saveBtn: Block
}

class ProfilePasswordEditablePage extends Block<ProfilePasswordEditablePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const modal = new Modal();
const linkBack = new LinkBack({});
const loadImg = new LoadImg({});
const profileAvatar = new ProfileAvatar({
  avatarPath: avatarStub,
  login: 'Иван',
  events: {
    click: () => {
      modal.show(
        loadImg.getContent(),
      );
    },
  },
});
const oldPasswordInput = new EditedLabel({
  text: 'Старый пароль',
  editable: true,
  value: '123123123A',
  type: 'password',
  name: 'oldPassword',
  inputPattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const newPasswordInput = new EditedLabel({
  text: 'Новый пароль',
  editable: true,
  value: '1234567890A',
  type: 'password',
  name: 'newPassword',
  inputPattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const repeatPasswordInput = new EditedLabel({
  text: 'Повторите новый пароль',
  editable: true,
  value: '1234567890A',
  type: 'password',
  name: 'repeat_password',
  inputPattern: checkRegexp.password.pattern,
  inputTitle: checkRegexp.password.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
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

export const profilePasswordEditablePage = new ProfilePasswordEditablePage({
  linkBack,
  profileAvatar,
  oldPasswordInput,
  newPasswordInput,
  repeatPasswordInput,
  saveBtn,
  events: {
    submit(e: SubmitEvent) {
      e.preventDefault();
      e.stopPropagation();

      const {
        oldPassword: { value: oldPassword },
        newPassword: { value: newPassword },
        repeat_password: { value: repeat_password },
      } = e.target! as typeof e.target & {
        oldPassword: { value: string };
        newPassword: { value: string };
        repeat_password: { value: string };
      };

      if (repeat_password !== newPassword) {
        notifications.addNotification('Пароли не совпадают', 'warning');
        return;
      }

      ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>).forEach(checkValidityInput);

      console.log({
        oldPassword,
        newPassword,
        repeat_password,
      });
    },
  },
});
