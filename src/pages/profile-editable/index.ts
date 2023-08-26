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
import { modal } from '../../core/Modal';
import { checkValidityInput } from '../../core/checkValidityInput';
import { ComponentPropsType } from '../../types/componentPropsType';
import { IUser, withStore } from '../../core/Store';
import { userController } from '../../controllers/user.controller';

interface ProfileEditablePageProps extends ComponentPropsType, IUser {
}

class ProfileEditablePageComponent extends Block<ProfileEditablePageProps> {
  init() {
    const loadImg = new LoadImg({});
    this._children.profileAvatar = new ProfileAvatar({
      avatarPath: this.props.avatar ?? avatarStub,
      login: this.props.first_name ?? '',
      events: {
        click: () => {
          modal.show(
            loadImg.getContent(),
          );
        },
      },
    });
    this._children.linkBack = new LinkBack({});
    this._children.editedEmail = new EditedLabel({
      text: 'Почта',
      editable: true,
      value: this.props.email ?? '',
      type: 'email',
      name: 'email',
      inputPattern: checkRegexp.email.pattern,
      inputTitle: checkRegexp.email.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.editedLogin = new EditedLabel({
      text: 'Логин',
      editable: true,
      value: this.props.login ?? '',
      type: 'text',
      name: 'login',
      inputPattern: checkRegexp.login.pattern,
      inputTitle: checkRegexp.login.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.editedFirstName = new EditedLabel({
      text: 'Имя',
      editable: true,
      value: this.props.first_name ?? '',
      type: 'text',
      name: 'first_name',
      inputPattern: checkRegexp.personalName.pattern,
      inputTitle: checkRegexp.personalName.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.editedSecondName = new EditedLabel({
      text: 'Фамилия',
      editable: true,
      value: this.props.second_name ?? '',
      type: 'text',
      name: 'second_name',
      inputPattern: checkRegexp.personalName.pattern,
      inputTitle: checkRegexp.personalName.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.editedDisplayName = new EditedLabel({
      text: 'Имя в чате',
      editable: true,
      value: this.props.display_name ?? '',
      type: 'text',
      name: 'display_name',
      inputPattern: checkRegexp.message.pattern,
      inputTitle: checkRegexp.message.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.editedPhone = new EditedLabel({
      text: 'Телефон',
      editable: true,
      value: this.props.phone ?? '',
      type: 'tel',
      name: 'phone',
      inputPattern: checkRegexp.phone.pattern,
      inputTitle: checkRegexp.phone.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.saveBtn = new Button({
      size: 'sm',
      variant: 'primary',
      center: true,
      text: 'Сохранить',
      attr: {
        type: 'submit',
      },
    });

    this.props.events = {
      async submit(e: SubmitEvent) {
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

        const arrayInputs = ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>);

        arrayInputs.forEach(checkValidityInput);

        const isCorrect = Array.from(arrayInputs).some((el) => el.checkValidity());
        if (!isCorrect) return;

        await userController.updateUser({
          first_name,
          second_name,
          display_name,
          login,
          email,
          phone,
        });

        console.log({
          first_name,
          second_name,
          display_name,
          login,
          email,
          phone,
        });
      },
    };
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfileEditablePage = withUser(ProfileEditablePageComponent);
