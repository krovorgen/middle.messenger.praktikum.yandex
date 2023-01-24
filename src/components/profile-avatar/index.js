import tpl from './profile-avatar.hbs';
import avatarStub from '../../../static/icons/not-avatar.svg';

export default (
  login,
  addClass = '',
  avatarPath = avatarStub,
) => tpl({ login, addClass, avatarPath });
