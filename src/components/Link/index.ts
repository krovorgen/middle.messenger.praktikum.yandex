import tpl from './link.hbs';
import { Block } from '../../core/Block';
import { routerApp } from '../../core/Route';
import { ComponentPropsType } from '../../types/componentPropsType';

interface LinkProps extends ComponentPropsType {
  text: string
  to: string;
  size: 'sm' | 'md'
  variant: 'primary' | 'accent'
  router?: typeof routerApp
}

export class NavLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      router: routerApp,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props!.router!.go(this.props.to);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
