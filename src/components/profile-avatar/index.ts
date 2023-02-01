import tpl from './profile-avatar.hbs';
import avatarStub from '../../../static/icons/not-avatar.svg';
import { Block } from '../../core/Block';

export default (
  login: string,
  addClass: string = '',
  avatarPath: string = avatarStub,
) => tpl({ login, addClass, avatarPath });

interface ProfileAvatarProps {
  login: string
  addClass?: string
  avatarPath: string
  attr?: Record<string, string>
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  constructor(props: ProfileAvatarProps) {
    super('div', {
      ...props,
      attr: {
        class: `profile-avatar ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
