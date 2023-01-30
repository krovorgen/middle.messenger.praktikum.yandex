import tpl from './link.hbs';
import { Block } from '../../utils/Block';

interface LinkProps {
  href: string
  text: string
  addClass?: string
  size: 'sm' | 'md'
  variant: 'primary' | 'accent'
  target: '_self' | '_blank'
  attr?: Record<string, string>
}

export class Link extends Block<LinkProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
