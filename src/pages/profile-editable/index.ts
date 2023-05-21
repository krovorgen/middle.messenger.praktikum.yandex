import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { LinkBack } from '../../components/LinkBack';
import { EditedLabel } from '../../components/EditedLabel';
import { Button } from '../../components/Button';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import avatarStub from '../../../static/icons/not-avatar.svg';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';
import { LoadImg } from '../../components/AvatarLoading';
import { Modal } from '../../core/Modal';
import { checkValidityInput } from '../../core/checkValidityInput';

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
  events: {
    submit: (e: SubmitEvent) => void
  }
}

class ProfileEditablePage extends Block<ProfileEditablePageProps> {
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
const editedEmail = new EditedLabel({
  text: 'Почта',
  editable: true,
  value: 'pochta@yandex.ru',
  type: 'email',
  name: 'email',
  inputPattern: checkRegexp.email.pattern,
  inputTitle: checkRegexp.email.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const editedLogin = new EditedLabel({
  text: 'Логин',
  editable: true,
  value: 'ivanivanov',
  type: 'text',
  name: 'login',
  inputPattern: checkRegexp.login.pattern,
  inputTitle: checkRegexp.login.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const editedFirstName = new EditedLabel({
  text: 'Имя',
  editable: true,
  value: 'Maksim',
  type: 'text',
  name: 'first_name',
  inputPattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const editedSecondName = new EditedLabel({
  text: 'Фамилия',
  editable: true,
  value: 'Berezka',
  type: 'text',
  name: 'second_name',
  inputPattern: checkRegexp.personalName.pattern,
  inputTitle: checkRegexp.personalName.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const editedDisplayName = new EditedLabel({
  text: 'Имя в чате',
  editable: true,
  value: 'Krovorgen',
  type: 'text',
  name: 'display_name',
  inputPattern: checkRegexp.message.pattern,
  inputTitle: checkRegexp.message.msg,
  events: {
    blur: showEventValidation,
    focus: showEventValidation,
  },
});
const editedPhone = new EditedLabel({
  text: 'Телефон',
  editable: true,
  value: '+79099673030',
  type: 'tel',
  name: 'phone',
  inputPattern: checkRegexp.phone.pattern,
  inputTitle: checkRegexp.phone.msg,
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

export const profileEditablePage = new ProfileEditablePage('div', {
  linkBack,
  profileAvatar,
  editedEmail,
  editedLogin,
  editedFirstName,
  editedSecondName,
  editedDisplayName,
  editedPhone,
  saveBtn,
  events: {
    submit(e: SubmitEvent) {
      e.preventDefault();
      e.stopPropagation();

      const {
        email: { value: email },
        login: { value: login },
        first_name: { value: first_name },
        second_name: { value: second_name },
        display_name: { value: display_name },
        phone: { value: phone },
      } = e.target! as typeof e.target & {
        email: { value: string };
        login: { value: string };
        first_name: { value: string };
        second_name: { value: string };
        display_name: { value: string };
        phone: { value: string };
      };

      ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>).forEach(checkValidityInput);

      console.log({
        email,
        login,
        first_name,
        second_name,
        display_name,
        phone,
      });
    },
  },
});
