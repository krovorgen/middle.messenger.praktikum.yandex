import tpl from './index.hbs';
import { renderDom } from '../../core/renderDom';
import { Block } from '../../core/Block';
import { Link } from '../../components/Link';

interface Error404PageProps {
  addClass?: string
  attr?: Record<string, string>
  link: Block
}

class Error404Page extends Block<Error404PageProps> {
  constructor(props: Error404PageProps) {
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
    href: '../index.html',
  },
});

window.addEventListener('DOMContentLoaded', () => {
  const error404Page = new Error404Page({
    link,
  });

  renderDom('#app', error404Page);
});
