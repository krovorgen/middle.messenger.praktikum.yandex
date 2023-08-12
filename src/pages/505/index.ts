import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { NavLink } from '../../components/Link';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';

interface Error505PageProps extends ComponentPropsType {
  link: Block
}

class Error505Page extends Block<Error505PageProps> {
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

export const error505Page = new Error505Page({
  link,
});
