import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { NavLink } from '../../components/Link';
import { RoutePath } from '../../core/RoutePath';
import { ComponentPropsType } from '../../types/componentPropsType';

interface Error505PageProps extends ComponentPropsType {
}

class Error505PageComponent extends Block<Error505PageProps> {
  init() {
    this._children.link = new NavLink({
      text: 'Назад к чатам',
      variant: 'primary',
      size: 'sm',
      to: RoutePath.login,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const Error505Page = Error505PageComponent;
