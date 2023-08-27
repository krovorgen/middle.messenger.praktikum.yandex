import tpl from './index.hbs';
import { Button } from '../../components/Button';
import { LinkBack } from '../../components/LinkBack';
import { EditedLabel } from '../../components/EditedLabel';
import { Block } from '../../core/Block';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import { notifications } from '../../components/Notification';
import { checkRegexp } from '../../core/CheckRegexp';
import { showEventValidation } from '../../core/showEventValidation';
import { LoadImg } from '../../components/AvatarLoading';
import { checkValidityInput } from '../../core/checkValidityInput';
import { ComponentPropsType } from '../../types/componentPropsType';
import { userController } from '../../controllers/user.controller';
import { modal } from '../../core/Modal';
import { IUser, withStore } from '../../core/Store';

interface ProfilePasswordEditablePageProps extends ComponentPropsType, IUser {
}

class ProfilePasswordEditablePageComponent extends Block<ProfilePasswordEditablePageProps> {
  init() {
    const loadImg = new LoadImg({});
    this._children.profileAvatar = new ProfileAvatar({
      events: {
        click: () => {
          modal.show(
            loadImg.getContent(),
          );
        },
      },
    });
    this._children.linkBack = new LinkBack({});
    this._children.oldPasswordInput = new EditedLabel({
      text: 'Старый пароль',
      editable: true,
      value: '',
      type: 'password',
      name: 'oldPassword',
      inputPattern: checkRegexp.password.pattern,
      inputTitle: checkRegexp.password.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.newPasswordInput = new EditedLabel({
      text: 'Новый пароль',
      editable: true,
      value: '',
      type: 'password',
      name: 'newPassword',
      inputPattern: checkRegexp.password.pattern,
      inputTitle: checkRegexp.password.msg,
      events: {
        blur: showEventValidation,
        focus: showEventValidation,
      },
    });
    this._children.repeatPasswordInput = new EditedLabel({
      text: 'Повторите новый пароль',
      editable: true,
      value: '',
      type: 'password',
      name: 'repeat_password',
      inputPattern: checkRegexp.password.pattern,
      inputTitle: checkRegexp.password.msg,
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

        const arrayInputs = ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>);

        arrayInputs.forEach(checkValidityInput);

        const isCorrect = Array.from(arrayInputs).some((el) => el.checkValidity());
        if (!isCorrect) return;

        await userController.updatePassword({
          newPassword,
          oldPassword,
        });

        console.log({
          oldPassword,
          newPassword,
          repeat_password,
        });
      },
    };
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePasswordEditablePage = withUser(ProfilePasswordEditablePageComponent);
