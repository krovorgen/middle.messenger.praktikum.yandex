import tpl from './index.hbs';
import { renderDom } from '../../utils/renderDom';
import { Block } from '../../utils/Block';
import { EmptyChooseMessage } from '../../components/empty-choose-message';

interface HomePageProps {
  addClass?: string
  emptyChooseMessage: Block
  attr?: Record<string, string>
}

class HomePage extends Block<HomePageProps> {
  constructor(props: HomePageProps) {
    super('div', {
      ...props,
      attr: {
        class: `column ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const emptyChooseMessage = new EmptyChooseMessage({});

window.addEventListener('DOMContentLoaded', () => {
  const homePage = new HomePage({
    emptyChooseMessage,
  });

  renderDom('#app', homePage);
});
