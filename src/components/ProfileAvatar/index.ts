import tpl from './profile-avatar.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface ProfileAvatarProps extends ComponentPropsType {
  login: string
  avatarPath: string
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
