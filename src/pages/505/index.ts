import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { Link } from '../../components/Link';
import { RoutePath } from '../../core/RoutePath';

interface Error505PageProps {
  addClass?: string
  attr?: Record<string, string>
  link: Block
}

class Error505Page extends Block<Error505PageProps> {
  constructor(props: Error505PageProps) {
    super('div', {
      ...props,
      attr: {
        class: `error-page ${props.addClass ?? ''}`,
        ...props.attr,
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

export const error505Page = new Error505Page({
  link,
});
