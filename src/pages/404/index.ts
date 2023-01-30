import tpl from './index.hbs';
import { renderDom } from '../../utils/renderDom';
import { Block } from '../../utils/Block';
import { Link } from '../../components/link';

interface Error404PageProps {
  title: string
  attr?: Record<string, string>
  link: Block
}

class Error404Page extends Block<Error404PageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const link = new Link('span', {
  href: '../index.html',
  text: 'Назад к чатам',
  target: '_self',
  variant: 'primary',
  size: 'sm',
});

window.addEventListener('DOMContentLoaded', () => {
  const homePage = new Error404Page('fragment', {
    title: 'hello world',
    attr: { class: 'error-page' },
    link,
  });

  renderDom('#app', homePage);
});
