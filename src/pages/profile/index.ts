import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { LinkBack } from '../../components/LinkBack';
import { NavLink } from '../../components/Link';
import { EditedLabel } from '../../components/EditedLabel';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import { LoadImg } from '../../components/AvatarLoading';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';
import { Button } from '../../components/Button';
import { authController } from '../../controllers/auth.controller';
import { IUser, withStore } from '../../core/Store';
import { modal } from '../../core/Modal';

interface ProfilePageProps extends ComponentPropsType, IUser {
}

class ProfilePageComponent extends Block<ProfilePageProps> {
  init() {
    this._children.editedEmail = new EditedLabel({
      text: 'Почта',
      editable: false,
      value: this.props.email ?? '',
    });
    this._children.linkBack = new LinkBack({});
    this._children.editedLogin = new EditedLabel({
      text: 'Логин',
      editable: false,
      value: this.props.login ?? '',
    });
    this._children.editedFirstName = new EditedLabel({
      text: 'Имя',
      editable: false,
      value: this.props.first_name ?? '',
    });
    this._children.editedSecondName = new EditedLabel({
      text: 'Фамилия',
      editable: false,
      value: this.props.second_name ?? '',
    });
    this._children.editedDisplayName = new EditedLabel({
      text: 'Имя в чате',
      editable: false,
      value: this.props.display_name ?? '',
    });
    this._children.editedPhone = new EditedLabel({
      text: 'Телефон',
      editable: false,
      value: this.props.phone ?? '',
    });
    this._children.editData = new NavLink({
      size: 'md',
      variant: 'primary',
      text: 'Изменить данные',
      to: RoutePath.profileEditable,
    });
    this._children.editPassword = new NavLink({
      size: 'md',
      variant: 'primary',
      text: 'Изменить пароль',
      to: RoutePath.profilePasswordEditable,
    });
    this._children.exitBtn = new Button({
      size: 'sm',
      variant: 'ghost',
      block: true,
      text: 'Выйти',
      events: {
        click: async () => {
          await authController.logout();
        },
      },
    });

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
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageComponent);
