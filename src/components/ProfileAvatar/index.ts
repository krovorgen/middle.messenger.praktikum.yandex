import tpl from './profile-avatar.hbs';
import { Block } from '../../core/Block';

interface ProfileAvatarProps {
  login: string
  addClass?: string
  avatarPath: string
  attr?: Record<string, string>
  events?: Record<string, unknown>
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
