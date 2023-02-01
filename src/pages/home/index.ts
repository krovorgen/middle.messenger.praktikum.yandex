import tpl from './index.hbs';
import { renderDom } from '../../core/renderDom';
import { Block } from '../../core/Block';
import { EmptyChooseMessage } from '../../components/empty-choose-message';
import { DialogItem } from '../../components/dialog-item';
import notAvatarImagePath from '../../../static/icons/not-avatar.svg';

interface HomePageProps {
  addClass?: string
  emptyChooseMessage: Block
  dialogItem: Block
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

const dialogItem = new DialogItem({
  avatarUrl: notAvatarImagePath,
});

window.addEventListener('DOMContentLoaded', () => {
  const homePage = new HomePage({
    emptyChooseMessage,
    dialogItem,
  });

  renderDom('#app', homePage);
});
