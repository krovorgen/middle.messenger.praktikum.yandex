import tpl from './link.hbs';
import { Block } from '../../core/Block';
import { routerApp } from '../../core/Route';

interface LinkProps {
  text: string
  addClass?: string
  size: 'sm' | 'md'
  to: string;
  variant: 'primary' | 'accent'
  router?: typeof routerApp
  events?: {
    click: () => void;
  };
  attr?: Record<string, string> | HTMLLinkElement
}

export class NavLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('span', {
      ...props,
      attr: {
        class: `link link--${props.size} link--${props.variant} ${props.addClass ?? ''}`,
        ...props.attr,
      },
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
