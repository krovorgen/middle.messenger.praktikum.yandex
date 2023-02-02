import tpl from './link.hbs';
import { Block } from '../../core/Block';

interface LinkProps {
  text: string
  addClass?: string
  size: 'sm' | 'md'
  variant: 'primary' | 'accent'
  attr?: Record<string, string> | HTMLLinkElement
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', {
      ...props,
      attr: {
        class: `link link--${props.size} link--${props.variant} ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
