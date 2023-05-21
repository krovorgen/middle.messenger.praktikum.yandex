import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { Link } from '../../components/Link';
import { RoutePath } from '../../core/RoutePath';

interface Error404PageProps {
  addClass?: string
  attr?: Record<string, string>
  link: Block
}

export class Error404Page extends Block<Error404PageProps> {
  constructor(props: Error404PageProps) {
    super('div', {
      ...props,
      attr: {
        class: `error-page ${props?.addClass ?? ''}`,
        ...props?.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const link = new Link({
  text: 'Назад к чатам',
  variant: 'primary',
  size: 'sm',
  attr: {
    href: RoutePath.messenger,
  },
});

export const error404Page = new Error404Page({
  link,
});
