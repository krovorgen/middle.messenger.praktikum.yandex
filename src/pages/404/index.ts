import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { NavLink } from '../../components/Link';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';

interface Error404PageProps extends ComponentPropsType {
  link: Block
}

export class Error404Page extends Block<Error404PageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const link = new NavLink({
  text: 'Назад к чатам',
  variant: 'primary',
  size: 'sm',
  to: RoutePath.login,
});

export const error404Page = new Error404Page({
  link,
});
