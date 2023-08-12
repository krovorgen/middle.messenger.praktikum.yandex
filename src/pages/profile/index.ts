import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { LinkBack } from '../../components/LinkBack';
import { NavLink } from '../../components/Link';
import { EditedLabel } from '../../components/EditedLabel';
import { ProfileAvatar } from '../../components/ProfileAvatar';
import avatarStub from '../../../static/icons/not-avatar.svg';
import { Modal } from '../../core/Modal';
import { LoadImg } from '../../components/AvatarLoading';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';

interface ProfilePageProps extends ComponentPropsType {
  linkBack: Block
  profileAvatar: Block
  editedEmail: Block
  editedLogin: Block
  editedFirstName: Block
  editedSecondName: Block
  editedDisplayName: Block
  editedPhone: Block
  editData: Block
  editPassword: Block
  exitBtn: Block
}

class ProfilePage extends Block<ProfilePageProps> {
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
const editData = new NavLink({
  size: 'md',
  variant: 'primary',
  text: 'Изменить данные',
  to: RoutePath.profileEditable,
});
const editPassword = new NavLink({
  size: 'md',
  variant: 'primary',
  text: 'Изменить пароль',
  to: RoutePath.profilePasswordEditable,
});
const exitBtn = new NavLink({
  size: 'md',
  variant: 'accent',
  text: 'Выйти',
  to: RoutePath.login,
});

export const profilePage = new ProfilePage({
  linkBack,
  profileAvatar,
  editedEmail,
  editedLogin,
  editedFirstName,
  editedSecondName,
  editedDisplayName,
  editedPhone,
  editData,
  editPassword,
  exitBtn,
});
