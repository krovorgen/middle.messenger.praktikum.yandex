import tpl from './profile-avatar.hbs';
import { Block } from '../../core/Block';
import { IUser, withStore } from '../../core/Store';
import { ComponentPropsType } from '../../types/componentPropsType';

interface ProfileAvatarProps extends ComponentPropsType, IUser {
}

class ProfileAvatarComponent extends Block<ProfileAvatarProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfileAvatar = withUser(ProfileAvatarComponent);
