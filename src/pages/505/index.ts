import tpl from './index.hbs';
import { renderDom } from '../../core/renderDom';
import { Block } from '../../core/Block';
import { Link } from '../../components/Link';

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
    href: '../index.html',
  },
});

window.addEventListener('DOMContentLoaded', () => {
  const error505Page = new Error505Page({
    link,
  });

  renderDom('#app', error505Page);
});
