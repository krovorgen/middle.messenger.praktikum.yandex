import tpl from './index.hbs';
// import link from '../../components/link';
import { renderDom } from '../../utils/renderDom';
import { Block } from '../../utils/Block';

// document.getElementById('root')!.innerHTML = tpl({
//   link: link(
//     '../index.html',
//     'Назад к чатам',
//     'error-page__link',
//   ),
// });

interface Error404PageProps {
  title: string;
  attr?: Record<string, string>
}

class Error404Page extends Block<Error404PageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const homePage = new Error404Page('div', {
    title: 'hello world',
    attr: { class: 'error-page' },
  });

  renderDom('#app', homePage);
});
