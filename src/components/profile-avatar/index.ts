import tpl from './profile-avatar.hbs';
import avatarStub from '../../../static/icons/not-avatar.svg';

export default (
  login: string,
  addClass: string = '',
  avatarPath: string = avatarStub,
) => tpl({ login, addClass, avatarPath });
